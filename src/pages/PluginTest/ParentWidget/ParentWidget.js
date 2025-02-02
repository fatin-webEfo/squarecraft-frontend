(async function loadSquareCraftPlugin() {
  console.log("✅ SquareCraft Plugin Loaded");

  const currentURL = window.location.href;
  console.log("🔗 Full URL:", currentURL);

  function shouldShowWidget() {
    const url = window.location.href;
    const pathname = window.location.pathname;
    return url.includes("#") || pathname !== "/";
  }

  function toggleWidgetVisibility() {
    const widget = document.getElementById("squarecraft-widget-container");
    if (!widget) return;
    widget.style.display = shouldShowWidget() ? "block" : "none";
  }

  const widgetScript = document.getElementById("squarecraft-script");
  const token = widgetScript?.dataset?.token;
  if (token) {
    console.log("🔑 Token received:", token);
    localStorage.setItem("squareCraft_auth_token", token);
    document.cookie = `squareCraft_auth_token=${token}; path=.squarespace.com;`;
  }

  let selectedElement = null;

  function initializeSquareCraft() {
    createWidget();
    attachEventListeners();
    fetchModifications();
    toggleWidgetVisibility();
  }

  function createWidget() {
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.top = "100px";
    widgetContainer.style.left = "100px";
    widgetContainer.style.cursor = "grab";
    widgetContainer.style.zIndex = "9999";

    widgetContainer.innerHTML = `
      <div style="width: 300px; background: #2c2c2c; padding: 20px; border-radius: 18px; border: 1.5px solid #3D3D3D; color: white;">
        <h3>🎨 SquareCraft Widget</h3>

        <label>Font Size:</label>
        <input type="number" id="squareCraftFontSize" value="16" min="10" max="50" style="width: 100%;">

        <label>Background Color:</label>
        <input type="color" id="squareCraftBgColor" value="#ffffff" style="width: 100%;">

        <label>Border Radius:</label>
        <input type="range" id="squareCraftBorderRadius" min="0" max="50" value="0">
        <p>Border Radius: <span id="borderRadiusValue">0px</span></p>

        <button id="squareCraftPublish" style="width: 100%; padding: 10px; background: #EF7C2F; color: white; border: none; border-radius: 5px; cursor: pointer;">
          Publish Changes
        </button>
      </div>
    `;

    document.body.appendChild(widgetContainer);
  }

  function attachEventListeners() {
    document.addEventListener("click", (event) => {
      let { pageId, elementId } = getPageAndElement(event.target);
      if (!pageId || !elementId) return;

      selectedElement = event.target;
      highlightElement(elementId);
      console.log(`🆔 Page ID: ${pageId}, Element ID: ${elementId}`);
    });

    document.getElementById("squareCraftFontSize").addEventListener("input", applyStyle);
    document.getElementById("squareCraftBgColor").addEventListener("input", applyStyle);
    document.getElementById("squareCraftBorderRadius").addEventListener("input", function () {
      document.getElementById("borderRadiusValue").textContent = this.value + "px";
      applyStyle();
    });

    document.getElementById("squareCraftPublish").addEventListener("click", async () => {
      if (!selectedElement) {
        console.warn("⚠️ No element selected for publishing.");
        return;
      }

      let { pageId, elementId } = getPageAndElement(selectedElement);
      if (!pageId || !elementId) {
        console.warn("⚠️ No valid page or block found for publishing.");
        return;
      }

      let css = getCSSModifications(selectedElement);
      console.log("🎨 Publishing Changes:", { pageId, elementId, css });

      await saveModifications(pageId, elementId, css);
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

  function applyStyle() {
    if (!selectedElement) return;
    selectedElement.style.fontSize = document.getElementById("squareCraftFontSize").value + "px";
    selectedElement.style.backgroundColor = document.getElementById("squareCraftBgColor").value;
    selectedElement.style.borderRadius = document.getElementById("squareCraftBorderRadius").value + "px";
  }

  function getCSSModifications(element) {
    if (!element) return null;
    const computedStyle = window.getComputedStyle(element);
    return {
      "font-size": computedStyle.fontSize,
      "background-color": computedStyle.backgroundColor,
      "border-radius": computedStyle.borderRadius,
      "color": computedStyle.color,
    };
  }

  function applyStylesToElement(elementId, css) {
    const element = document.getElementById(elementId);
    if (!element) return;

    Object.keys(css).forEach((prop) => {
      element.style[prop] = css[prop];
    });

    console.log(`🎨 Styles applied to ${elementId}:`, css);
  }

  function highlightElement(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    element.style.animation = "borderGlow 1s infinite alternate";

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes borderGlow {
        0% { border: 2px solid red; }
        50% { border: 2px solid yellow; }
        100% { border: 2px solid red; }
      }
    `;
    document.head.appendChild(style);
  }

  async function fetchModifications() {
    try {
      const userId = "679b4e3aee8e48bf97172661";
      let pageElement = document.querySelector("article[data-page-sections]");
      let pageId = pageElement ? pageElement.getAttribute("data-page-sections") : null;

      if (!pageId) {
        console.warn("⚠️ No valid page ID found. Retrying...");
        setTimeout(fetchModifications, 2000);
        return;
      }

      console.log(`📄 Fetching modifications for Page ID and elemt id: ${pageId}`);

      const response = await fetch(`https://webefo-backend.vercel.app/api/v1/get-modifications?userId=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`,
        }
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("📥 Fetched Modifications:", data);

      data.modifications.forEach(({ elements }) => elements.forEach(({ elementId, css }) => applyStylesToElement(elementId, css)));

    } catch (error) {
      console.error("❌ Error fetching modifications:", error);
    }
  }

  async function saveModifications(pageId, elementId, css) {
    if (!pageId || !elementId || !css) return;

    applyStylesToElement(elementId, css);
    console.log("Saving modifications for page id and element id:", pageId, elementId)

    try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`
        },
        body: JSON.stringify({ userId: "679b4e3aee8e48bf97172661", modifications: [{ pageId, elements: [{ elementId, css }] }] }),
      });

      console.log("✅ Changes Saved Successfully!", response);

    } catch (error) {
      console.error("❌ Error saving modifications:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", initializeSquareCraft);
  window.addEventListener("hashchange", toggleWidgetVisibility);
  window.addEventListener("popstate", toggleWidgetVisibility);
})();
