(async function loadSquareCraftPlugin() {
  console.log("✅ SquareCraft Plugin Loaded");

  const widgetScript = document.getElementById("squarecraft-script");
  const token = widgetScript?.dataset?.token;

  if (token) {
    console.log("🔑 Token received:", token);
    localStorage.setItem("squareCraft_auth_token", token);
    document.cookie = `squareCraft_auth_token=${token}; path=.squarespace.com;`;
  }

  document.addEventListener("DOMContentLoaded", function () {
    console.log("📜 DOM Fully Loaded!");
    initializeSquareCraft();
  });

  function initializeSquareCraft() {
    createWidget();
    attachEventListeners();
  }

  function createWidget() {
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.top = "100px";
    widgetContainer.style.left = "100px";
    widgetContainer.style.cursor = "grab";
    widgetContainer.style.zIndex = "9999";

    const link = document.createElement("link");
    link.id = "squarecraft-styles";
    link.rel = "stylesheet";
    link.href = "https://fatin-webefo.github.io/squarecraft-frontend/src/pages/PluginTest/ParentWidget/ParentWidget.css";
    document.head.appendChild(link);

    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jqueryScript.onload = function () {
      console.log("✅ jQuery Loaded Successfully");
    };
    document.head.appendChild(jqueryScript);

    widgetContainer.innerHTML = `
      <div style="width: 300px; background: #2c2c2c; padding: 20px; border-radius: 18px; border: 1.5px solid #3D3D3D;">
        <p style="color: white;">🎨 SquareCraft Widget</p>
        <p id="squareCraftPercentage" style="color: white;">Border Radius: 0%</p>
        <input type="range" min="0" max="100" value="0" id="squareCraftRange">
        <button id="squareCraftPublish" style="width: 100%; padding: 10px; background: #EF7C2F; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Publish Changes
        </button>
      </div>
    `;

    document.body.appendChild(widgetContainer);

    let offset = { x: 0, y: 0 };
    widgetContainer.onmousedown = function (e) {
      const rect = widgetContainer.getBoundingClientRect();
      offset.x = e.clientX - rect.left;
      offset.y = e.clientY - rect.top;

      const onMouseMove = (event) => {
        widgetContainer.style.left = `${event.clientX - offset.x}px`;
        widgetContainer.style.top = `${event.clientY - offset.y}px`;
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    const rangeInput = document.getElementById("squareCraftRange");
    const progressText = document.getElementById("squareCraftPercentage");

    if (rangeInput && progressText) {
      rangeInput.addEventListener("input", (e) => {
        progressText.textContent = `Border Radius: ${e.target.value}%`;
      });
    }
  }



  function attachEventListeners() {
    document.addEventListener("click", (event) => {
      let { pageId, elementId } = getPageAndElement(event.target);
      if (!pageId || !elementId) return;

      let css = getCSSModifications(event.target);
      console.log("🎨 Captured CSS:", css);
    });

    document.getElementById("squareCraftPublish").addEventListener("click", () => {
      let activeElement = document.activeElement;
      let { pageId, elementId } = getPageAndElement(activeElement);
      if (!pageId || !elementId) return;

      let css = getCSSModifications(activeElement);
      saveModifications(pageId, elementId, css);
    });
  }

  function getPageAndElement(targetElement) {
    let page = targetElement.closest("article[data-page-sections]");
    let block = targetElement.closest('[id^="block-"]');

    if (!page || !block) {
      console.warn("⚠️ No valid page or block found.");
      return {};
    }

    return {
      pageId: page.getAttribute("data-page-sections"),
      elementId: block.id,
    };
  }

  function getCSSModifications(element) {
    if (!element) return null;
    const computedStyle = window.getComputedStyle(element);

    return {
      "font-size": computedStyle.fontSize,
      "background-color": computedStyle.backgroundColor,
      "border-radius": computedStyle.borderRadius,
      "color": computedStyle.color,
      "padding": computedStyle.padding,
    };
  }

  function applyStylesToElement(elementId, css) {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`⚠️ Element #${elementId} not found.`);
      return;
    }

    Object.keys(css).forEach((prop) => {
      element.style[prop] = css[prop];
    });

    console.log(`🎨 Styles applied to #${elementId}:`, css);
  }

  async function saveModifications(pageId, elementId, css) {
    if (!pageId || !elementId || !css) {
      console.error("⚠️ Missing data: Page ID or Element ID is undefined.");
      return;
    }

    applyStylesToElement(elementId, css);

    try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "679b4e3aee8e48bf97172661", modifications: [{ pageId, elements: [{ elementId, css }] }] }),
      });
      console.log(response)

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      console.log("✅ Changes Saved Successfully!");
    } catch (error) {
      console.error("❌ Error saving modifications:", error);
    }
  }
})();
