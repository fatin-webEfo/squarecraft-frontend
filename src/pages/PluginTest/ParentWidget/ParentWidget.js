(async function loadSquareCraftPlugin() {
  console.log("✅ SquareCraft Plugin Loaded");

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
  }

  function attachEventListeners() {
    document.addEventListener("click", (event) => {
      let { pageId, elementId } = getPageAndElement(event.target);
      if (!pageId || !elementId) return;
      console.log(`🆔 Page ID: ${pageId}, Element ID: ${elementId}`);
    });

    document.getElementById("squareCraftFontSize").addEventListener("input", applyStyle);
    document.getElementById("squareCraftBgColor").addEventListener("input", applyStyle);
    document.getElementById("squareCraftBorderRadius").addEventListener("input", function () {
      document.getElementById("borderRadiusValue").textContent = this.value + "px";
      applyStyle();
    });

    document.getElementById("squareCraftPublish").addEventListener("click", async () => {
      let activeElement = document.activeElement;
      let { pageId, elementId } = getPageAndElement(activeElement);
      if (!pageId || !elementId) {
        console.warn("⚠️ No valid page or block found for publishing.");
        return;
      }

      let css = getCSSModifications(activeElement);
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
    let activeElement = document.activeElement;
    if (!activeElement) return;

    let fontSize = document.getElementById("squareCraftFontSize").value + "px";
    let bgColor = document.getElementById("squareCraftBgColor").value;
    let borderRadius = document.getElementById("squareCraftBorderRadius").value + "px";

    activeElement.style.fontSize = fontSize;
    activeElement.style.backgroundColor = bgColor;
    activeElement.style.borderRadius = borderRadius;
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
      console.warn(`⚠️ Element #${elementId} not found.`);
      return;
    }

    Object.keys(css).forEach((prop) => {
      element.style[prop] = css[prop];
    });

    console.log(`🎨 Styles applied to #${elementId}:`, css);
  }

  async function saveModifications(pageId, elementId, css) {
    if (!pageId || !elementId || !css) {
      console.warn("⚠️ Missing data: Page ID or Element ID is undefined.");
      return;
    }

    applyStylesToElement(elementId, css);
    console.log("CSS: " + css)

    try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "679b4e3aee8e48bf97172661", modifications: [{ pageId, elements: [{ elementId, css }] }] }),
      });

      console.log("✅ Changes Saved Successfully!" , response);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    } catch (error) {
      console.error("❌ Error saving modifications:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", initializeSquareCraft);
})();
