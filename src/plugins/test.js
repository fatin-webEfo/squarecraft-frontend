(async function () {
    const isBaseDomain = window.location.pathname === "/";
    console.log("isBaseDomain:", isBaseDomain);
    console.log("Current pathname:", window.location.pathname);

    console.log("Plugin Loaded: Configuring the widget...");

    // Create the widget UI
    const widget = document.createElement("div");
    widget.id = "style-widget";
    widget.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: white;
      border: 1px solid #ddd;
      padding: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      display: none; /* Initially hidden */
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;

    widget.innerHTML = `
      <h4>Style Editor</h4>
      <label>
        Element Selector:
        <input id="element-selector" type="text" placeholder=".className or #id" />
      </label>
      <br />
      <label>
        CSS Property:
        <input id="css-property" type="text" placeholder="e.g., color" />
      </label>
      <br />
      <label>
        Value:
        <input id="css-value" type="text" placeholder="e.g., red" />
      </label>
      <br />
      <button id="apply-style">Apply</button>
      <button id="publish-style">Publish</button>
      <div id="progress-bar-container" style="display:none; margin-top:10px;">
        <div id="progress-bar" style="width: 0%; height: 10px; background-color: green;"></div>
      </div>
    `;

    document.body.appendChild(widget);
    console.log("Widget UI created.");

    let selectedElement = null;
    document.body.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Prevent widget selection itself
        if (e.target.closest("#style-widget")) return;

        selectedElement = e.target;

        console.log("Element clicked:", selectedElement);

        // Check if the selected element is the content we want (e.g., <h1> tag)
        let contentElement = selectedElement.closest("h1, p, div"); // Change this selector as needed
        if (contentElement) {
            // If the element is a block element that you want to edit, show its content
            document.getElementById("element-selector").value =
                getSelector(contentElement);
            widget.style.display = "block";
            console.log("Widget is now visible with simple element.");
        }
    });

    // Function to get a unique selector for an element
    function getSelector(el) {
        if (el.id) return `#${el.id}`;
        if (el.className) return `.${el.className.split(" ").join(".")}`;
        return el.tagName.toLowerCase();
    }

    // Apply styles to the selected element
    const applyStyleButton = document.getElementById("apply-style");
    applyStyleButton.addEventListener("click", () => {
        const selector = document.getElementById("element-selector").value.trim();
        const property = document.getElementById("css-property").value.trim();
        const value = document.getElementById("css-value").value.trim();

        console.log("Apply style clicked. Values:", { selector, property, value });

        if (selector && property && value) {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el) => {
                el.style[property] = value;
                console.log(
                    `Applied style ${property}: ${value} to elements matching ${selector}`
                );
            });
            alert("Style applied locally.");
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Show progress bar while saving styles globally
    function showProgressBar() {
        const progressBarContainer = document.getElementById(
            "progress-bar-container"
        );
        const progressBar = document.getElementById("progress-bar");

        progressBarContainer.style.display = "block";
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    progressBarContainer.style.display = "none";
                }, 500);
            }
        }, 200);
    }

    // Save styles globally (persisted across routes)
    const publishStyleButton = document.getElementById("publish-style");
    publishStyleButton.addEventListener("click", async () => {
        const selector = document.getElementById("element-selector").value.trim();
        const property = document.getElementById("css-property").value.trim();
        const value = document.getElementById("css-value").value.trim();

        console.log("Publish style clicked. Values:", {
            selector,
            property,
            value,
        });

        if (selector && property && value) {
            showProgressBar(); // Show progress bar

            try {
                const response = await fetch("http://localhost:8000/api/v1/modifications", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        pageId: "alkfja234", // Example pageId; replace as needed
                        modifications: {
                            [property]: value,
                        },
                        userId: "6790aa9c823ae33a79a3141e", // Example userId; replace as needed
                    }),
                });
                const result = await response.json();

                console.log("Saving style to server...", result);

                if (response.ok) {
                    console.log("Style saved globally.");
                    alert("Style saved globally!");
                } else {
                    throw new Error(result.message || "Failed to save style.");
                }
            } catch (error) {
                console.error("Error saving style:", error);
                alert("An error occurred while saving style.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Fetch and apply saved styles globally on all routes
    try {
        const response = await fetch("http://localhost:8000/api/v1/modifications");
        const result = await response.json();

        console.log("Fetching saved styles...", result);

        if (!response.ok) throw new Error(result.message || "Failed to fetch saved styles.");

        const savedStyles = result.modification;

        if (savedStyles && savedStyles.modifications) {
            const modifications = savedStyles.modifications;
            for (const [property, value] of Object.entries(modifications)) {
                const elements = document.querySelectorAll("*"); // Apply globally or change the selector as needed
                elements.forEach((el) => {
                    el.style[property] = value;
                    console.log(`Applied saved style ${property}: ${value}`);
                });
            }
        }

        console.log("Saved styles applied globally.");
    } catch (error) {
        console.error("Error fetching saved styles:", error);
    }
})();
