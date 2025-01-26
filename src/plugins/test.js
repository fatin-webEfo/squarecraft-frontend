(async function () {
    console.log("✅ SquareCraft Plugin Loaded");
    // Listener Script for Squarespace
window.addEventListener("message", (event) => {
  console.log("Message event received:", event); // Log the event for debugging

  // Validate the origin to ensure the message is from your plugin website
  if (event.origin !== "https://steady-cobbler-fd4750.netlify.app") {
    console.error("Untrusted origin:", event.origin);
    return;
  }

  console.log("Message received from trusted origin:", event.origin); // Confirm valid origin

  const { type, squarCraft_auth_token } = event.data;

  if (type === "squarCraft_auth_token" && squarCraft_auth_token) {
    // Store the token in localStorage so it’s available across all routes
    localStorage.setItem("squarCraft_auth_token", squarCraft_auth_token);
    console.log("Token stored in Squarespace localStorage:", squarCraft_auth_token);
  } else {
    console.error("Message received but data is invalid:", event.data);
  }
});

    
    
  
    const adminHeader = document.querySelector('.admin-header');
    if (adminHeader) {
      const logo = document.createElement('img');
      logo.src = 'https://webefo.com/wp-content/uploads/2023/09/cropped-Webefo-Favicon.png';
      logo.alt = 'Plugin Logo';
      logo.style.cssText = 'height: 40px;';
      adminHeader.prepend(logo);
    }
  
    let selectedElement = null;
    let styles = {
      backgroundColor: "#ffffff",
      color: "#000000",
      fontSize: "16px",
    };
  
    // Function to get the token from cookies
    function getCookie(name) {
      const cookies = document.cookie.split("; ");
      for (let i = 0; i < cookies.length; i++) {
        const [key, value] = cookies[i].split("=");
        if (key === name) {
          return decodeURIComponent(value);
        }
      }
      return null;
    }
  
    // Fetch the token from cookies
    // const squarCraft_auth_token = getCookie("squarCraft_auth_token");
    // console.log("Token retrieved from cookies:", squarCraft_auth_token);
  
    // if (!squarCraft_auth_token) {
    //   console.error("No user token found in cookies. Unauthorized.");
    //   return;
    // }
    const squarCraft_auth_token = getCookie("squarCraft_auth_token");
    if (!squarCraft_auth_token) {
      console.error(
        "No token found in cookies. Ensure the cookie is set during registration/login."
      );
      return;
    }
    console.log("Token retrieved from cookies:", squarCraft_auth_token);
  
    try {
      const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${squarCraft_auth_token}`,
        },
      });
      console.log("GET request response:", response);
  
      if (!response.ok) throw new Error("Failed to fetch saved styles");
  
      const stylesData = await response.json();
      console.log("Fetched saved styles:", stylesData);
      applySavedStyles(stylesData);
    } catch (error) {
      console.error("Error fetching saved styles:", error);
    }
  
    function applySavedStyles(stylesData) {
      Object.keys(stylesData).forEach((selector) => {
        const element = document.querySelector(selector);
        if (element) {
          const style = stylesData[selector];
          element.style.backgroundColor = style.backgroundColor;
          element.style.color = style.color;
          element.style.fontSize = style.fontSize;
        }
      });
    }
  
    function handleElementSelect(event) {
      if (
        event.target.id !== "squarecraft-widget" &&
        event.target.id !== "squarecraft-panel"
      ) {
        selectedElement = event.target;
        console.log("🎯 Selected:", selectedElement);
  
        const computedStyle = window.getComputedStyle(selectedElement);
        styles = {
          backgroundColor: computedStyle.backgroundColor,
          color: computedStyle.color,
          fontSize: parseInt(computedStyle.fontSize, 10) + "px",
        };
  
        updatePanelInputs();
      }
    }
  
    function handleApplyChanges() {
      if (!selectedElement) return;
  
      selectedElement.style.backgroundColor = styles.backgroundColor;
      selectedElement.style.color = styles.color;
      selectedElement.style.fontSize = styles.fontSize;
  
      fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${squarCraft_auth_token}`,
        },
        body: JSON.stringify({
          elementSelector: selectedElement.tagName + "" + selectedElement.className,
          styles,
        }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to save styles");
          return response.json();
        })
        .then((data) => {
          console.log("Styles saved to backend:", data);
        })
        .catch((error) => {
          console.error("Error saving styles:", error);
        });
    }
  
    function updatePanelInputs() {
      document.getElementById("bg-color-input").value = styles.backgroundColor;
      document.getElementById("text-color-input").value = styles.color;
      document.getElementById("font-size-input").value = parseInt(styles.fontSize, 10);
    }
  
    const widget = document.createElement("div");
    widget.id = "squarecraft-widget";
    widget.className =
      "fixed bottom-5 right-5 w-12 h-12 bg-orange-500 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:bg-orange-600";
    widget.innerHTML = "⚙️";
    widget.onclick = () =>
      document.getElementById("squarecraft-panel").classList.toggle("hidden");
    document.body.appendChild(widget);
  
    const panel = document.createElement("div");
    panel.id = "squarecraft-panel";
    panel.className =
      "hidden fixed bottom-20 right-5 bg-white p-6 shadow-lg rounded-md w-72 z-50 border border-gray-200";
    panel.innerHTML = `
        <h3 class="text-lg font-semibold mb-4 text-gray-700">SquareCraft Editor</h3>
        <label class="block mb-2 text-sm font-medium">Background Color:</label>
        <input id="bg-color-input" type="color" class="w-full mb-4 p-2 border rounded" />
  
        <label class="block mb-2 text-sm font-medium">Text Color:</label>
        <input id="text-color-input" type="color" class="w-full mb-4 p-2 border rounded" />
  
        <label class="block mb-2 text-sm font-medium">Font Size:</label>
        <input id="font-size-input" type="number" class="w-full mb-4 p-2 border rounded" />
  
        <button id="apply-button" class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Apply Changes</button>
      `;
    document.body.appendChild(panel);
  
    document.getElementById("bg-color-input").addEventListener("input", (e) => {
      styles.backgroundColor = e.target.value;
    });
  
    document.getElementById("text-color-input").addEventListener("input", (e) => {
      styles.color = e.target.value;
    });
  
    document.getElementById("font-size-input").addEventListener("input", (e) => {
      styles.fontSize = e.target.value + "px";
    });
  
    document.getElementById("apply-button").addEventListener("click", handleApplyChanges);
  
    document.addEventListener("click", handleElementSelect);
  })();