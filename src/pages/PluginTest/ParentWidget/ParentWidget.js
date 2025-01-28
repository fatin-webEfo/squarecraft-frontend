(async function () {
    console.log("✅ SquareCraft Plugin Loaded");

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }
  
  function generateRandomToken(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }
  
  const existingToken = getCookie('squareCraft_token');
  if (!existingToken) {
    const newToken = generateRandomToken();
    setCookie('squareCraft_token', newToken, 7); // Set the cookie with a 7-day expiry
    console.log('🔑 New token set in cookie:', newToken);
  } else {
    console.log('✅ Token already exists in cookie:', existingToken);
  }
  




  
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
    link.type = "text/css";
    link.href =
      "https://fatin-webefo.github.io/squarecraft-frontend/src/pages/PluginTest/ParentWidget/ParentWidget.css";
    document.head.appendChild(link);
  
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jqueryScript.type = "text/javascript";
    jqueryScript.onload = function () {
      console.log("✅ jQuery has been successfully loaded");
    };
    document.head.appendChild(jqueryScript);
  
    widgetContainer.innerHTML = `
      <div style="background-color: #2c2c2c; width: 300px; color: white;" class="rounded-xl font-light text-sm p-4 mx-auto">
        <h3>Modify Font Size</h3>
        <div>
          <input type="number" id="font-size-input" placeholder="Enter font size (px)" style="width: 40px; padding: 8px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px;" />
          <button id="apply-font-size" style="padding: 10px 20px; background-color: #ef7c2f; color: white; border: none; border-radius: 5px; cursor: pointer;">Apply Font Size</button>
        </div>
      </div>
    `;
  
    document.body.appendChild(widgetContainer);
  
    // Drag functionality for the widget
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
  
    let selectedElement = null;
  
    // Add click event listener to the document
    document.addEventListener("click", (event) => {
      const target = event.target;
  
      // Traverse up to the nearest parent div with ID starting with "block-"
      let parent = target;
      while (parent && parent.tagName !== "HTML") {
        if (parent.id && parent.id.startsWith("block-")) {
          selectedElement = parent;
          console.log("Selected element:", selectedElement);
          alert(`Selected block with ID: ${selectedElement.id}`);
          break;
        }
        parent = parent.parentElement;
      }
  
      if (!selectedElement) {
        console.warn("No parent block with ID starting with 'block-' found.");
      }
    });
  
    // Apply font size change
    document.getElementById("apply-font-size").addEventListener("click", async () => {
      const fontSize = document.getElementById("font-size-input").value;
  
      if (!selectedElement) {
        alert("No element selected. Please click on an element first.");
        return;
      }
  
      if (!fontSize) {
        alert("Please enter a valid font size.");
        return;
      }
  
      // Apply the font size to the selected element
      selectedElement.style.fontSize = `${fontSize}px`;
  
      // Send the modification to the API
      const payload = {
        pageId: "alkfja234",
        modifications: {
          fontSize: `${fontSize}px`,
        },
        userId: "67962823ce065360d822548f",
      };
  
      try {
        const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          console.log("Font size updated successfully:", payload);
          alert("Font size updated successfully!");
        } else {
          console.error("Failed to update font size:", await response.text());
          alert("Failed to update font size.");
        }
      } catch (error) {
        console.error("Error while sending request:", error);
        alert("Error while sending request.");
      }
    });
  
    // Fetch existing modifications from the API
    async function fetchModifications() {
      try {
        const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications?pageId=alkfja234", {
          method: "GET",
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched modifications:", data);
  
          // Apply modifications to elements
          if (data.modifications && data.modifications.fontSize) {
            const elements = document.querySelectorAll("[id^='block-']");
            elements.forEach((element) => {
              element.style.fontSize = data.modifications.fontSize;
            });
            alert(`Applied font size: ${data.modifications.fontSize} to all elements.`);
          }
        } else {
          console.error("Failed to fetch modifications:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching modifications:", error);
      }
    }
  
    // Fetch modifications on load
    fetchModifications();
  })();
  