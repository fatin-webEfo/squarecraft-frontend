(function () {
    // Check if jQuery is available, otherwise load it
    if (!window.jQuery) {
        var script = document.createElement("script");
        script.src = "https://code.jquery.com/jquery-3.6.0.min.js";
        script.onload = initPlugin;
        document.head.appendChild(script);
    } else {
        initPlugin();
    }

    function initPlugin() {
        // Basic styles to apply changes
        let style = document.createElement("style");
        style.innerHTML = `
            .squarecraft-widget {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border: 1px solid #ccc;
                padding: 10px;
                z-index: 9999;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            }
            .squarecraft-widget input {
                width: 100px;
                margin: 5px 0;
            }
        `;
        document.head.appendChild(style);

        // Create widget UI
        let widget = document.createElement("div");
        widget.classList.add("squarecraft-widget");
        widget.innerHTML = `
            <label>Background Color:</label> <input type="color" id="bgColor" /><br>
            <label>Text Color:</label> <input type="color" id="textColor" /><br>
            <button id="applyStyle">Apply Changes</button>
        `;
        document.body.appendChild(widget);

        // Apply styles when user clicks on the button
        document.getElementById("applyStyle").addEventListener("click", function () {
            // Get the user-selected colors
            let bgColor = document.getElementById("bgColor").value;
            let textColor = document.getElementById("textColor").value;

            // Apply changes to the entire page
            document.body.style.backgroundColor = bgColor;
            document.body.style.color = textColor;

            // Save changes to localStorage (to persist after page reload)
            localStorage.setItem("bgColor", bgColor);
            localStorage.setItem("textColor", textColor);
        });

        // Apply saved styles from localStorage on page load
        let savedBgColor = localStorage.getItem("bgColor");
        let savedTextColor = localStorage.getItem("textColor");
        if (savedBgColor && savedTextColor) {
            document.body.style.backgroundColor = savedBgColor;
            document.body.style.color = savedTextColor;
        }
    }
})();
