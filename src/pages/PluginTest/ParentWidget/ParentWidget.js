  (async function loadSquareCraftPlugin() {
    console.log("✅ SquareCraft Plugin Loaded");
    const widgetScript = document.getElementById("squarecraft-script");
    const token = widgetScript?.dataset?.token;

    if (token) {
      console.log("Token received from script tag:", token);
      localStorage.setItem("squareCraft_auth_token", token);
      document.cookie = `squareCraft_auth_token=${token}; path=.squarespace.com;`;
    }

    let selectedElement = null; // Store last clicked element

    function initializeSquareCraft() {
      createWidget();
      attachEventListeners();
      fetchModifications();
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
      // 🖱️ Detect Clicked Element & Store it
      document.addEventListener("click", (event) => {
        let { pageId, elementId } = getPageAndElement(event.target);
        if (!pageId || !elementId) return;

        selectedElement = event.target; // ✅ Store selected element
        console.log(`🆔 Page ID: ${pageId}, Element ID: ${elementId}`);
      });

      // 🎨 Apply Style on Input Change
      document.getElementById("squareCraftFontSize").addEventListener("input", applyStyle);
      document.getElementById("squareCraftBgColor").addEventListener("input", applyStyle);
      document.getElementById("squareCraftBorderRadius").addEventListener("input", function () {
        document.getElementById("borderRadiusValue").textContent = this.value + "px";
        applyStyle();
      });

      // 💾 Publish Changes on Button Click
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
      if (!selectedElement) {
        console.warn("⚠️ No element selected to apply styles.");
        return;
      }

      let fontSize = document.getElementById("squareCraftFontSize").value + "px";
      let bgColor = document.getElementById("squareCraftBgColor").value;
      let borderRadius = document.getElementById("squareCraftBorderRadius").value + "px";

      selectedElement.style.fontSize = fontSize;
      selectedElement.style.backgroundColor = bgColor;
      selectedElement.style.borderRadius = borderRadius;
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
      const element = document.querySelector(`[id="${elementId}"], .${elementId}`);
      if (!element) {
        console.warn(`⚠️ Element #${elementId} not found.`);
        return;
      }
    
      Object.keys(css).forEach((prop) => {
        let cssProperty = prop.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
        element.style[cssProperty] = css[prop];
      });
    
      console.log(`🎨 Styles applied to ${elementId}:`, css);
    }
    
    function applySavedModifications(data) {
      if (!data || !data.modifications) {
        console.warn("⚠️ No modifications found.");
        return;
      }
    
      data.modifications.forEach((modification) => {
        modification.elements.forEach((element) => {
          const elementId = element.elementId;
          const css = element.css;
    
          applyStylesToElement(elementId, css);
        });
      });
    
      console.log("🎨 Applied fetched modifications to elements.");
    }
    
    async function fetchModifications() {
      try {
        const userId = "679b4e3aee8e48bf97172661"; // Hardcoded userId
        const response = await fetch(`https://webefo-backend.vercel.app/api/v1/get-modifications?userId=${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`

          }
        });
        console.log("get method response" , response)
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("📥 Fetched Modifications:", data);
    
        applySavedModifications(data); // Apply fetched styles to elements
    
      } catch (error) {
        console.error("❌ Error fetching modifications:", error);
      }
    }
    

    async function saveModifications(pageId, elementId, css) {
      if (!pageId || !elementId || !css) {
        console.warn("⚠️ Missing data: Page ID or Element ID is undefined.");
        return;
      }

      applyStylesToElement(elementId, css);

      try {
        const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token || localStorage.getItem("squareCraft_auth_token")}`
,
            "pageId": pageId,
            "userId": "679b4e3aee8e48bf97172661"
          },
          body: JSON.stringify({ userId: "679b4e3aee8e48bf97172661", modifications: [{ pageId, elements: [{ elementId, css }] }] }),
        });

        console.log("✅ Changes Saved Successfully!", response);

      } catch (error) {
        console.error("❌ Error saving modifications:", error);
      }
    }

    document.addEventListener("DOMContentLoaded", initializeSquareCraft);
  })();
