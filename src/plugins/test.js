// Example Frontend Code (In the Code Injection Page on Squarespace)
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ SquareCraft Plugin Loaded");

    let selectedElement = null;

    // Create & Inject Widget Button
    let widget = document.createElement("div");
    widget.id = "squarecraft-widget";
    widget.innerText = "⚙";
    document.body.appendChild(widget);

    // Inject CSS Styles
    let style = document.createElement("style");
    style.innerHTML = `
        #squarecraft-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            background-color: #ff5722;
            color: white;
            text-align: center;
            line-height: 50px;
            border-radius: 50%;
            cursor: pointer;
            font-weight: bold;
            z-index: 1000;
            box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);

    // Create Settings Panel
    let panel = document.createElement("div");
    panel.id = "squarecraft-panel";
    panel.innerHTML = `
        <label>Background:</label>
        <input type="color" id="bgColor">
        
        <label>Text Color:</label>
        <input type="color" id="textColor">
        
        <label>Font Size:</label>
        <input type="number" id="fontSize" placeholder="e.g. 16">
        
        <button id="applyChanges">Apply</button>
    `;
    document.body.appendChild(panel);

    // Select Element on Click
    document.addEventListener("click", function (event) {
        if (event.target.id !== "squarecraft-widget" && event.target.id !== "squarecraft-panel" && !panel.contains(event.target)) {
            selectedElement = event.target;
            panel.style.display = "flex";
            console.log("🎯 Selected:", selectedElement);

            // Load current styles
            document.getElementById("bgColor").value = rgbToHex(window.getComputedStyle(selectedElement).backgroundColor);
            document.getElementById("textColor").value = rgbToHex(window.getComputedStyle(selectedElement).color);
            document.getElementById("fontSize").value = parseInt(window.getComputedStyle(selectedElement).fontSize);
        }
    });

    // Apply Changes
    document.getElementById("applyChanges").addEventListener("click", function () {
        if (selectedElement) {
            let bgColor = document.getElementById("bgColor").value;
            let textColor = document.getElementById("textColor").value;
            let fontSize = document.getElementById("fontSize").value + "px";

            // Apply styles directly
            selectedElement.style.backgroundColor = bgColor;
            selectedElement.style.color = textColor;
            selectedElement.style.fontSize = fontSize;

            // Send styles to backend API for saving
            fetch("http://localhost:8000/api/v1/modifications", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    elementSelector: selectedElement.tagName + selectedElement.className,
                    styles: {
                        backgroundColor: bgColor,
                        color: textColor,
                        fontSize: fontSize,
                    },
                }),
            }).then(response => response.json())
              .then(data => console.log("Styles saved to backend:", data));
        }
    });

    // Load saved styles from backend API
    fetch("http://localhost:8000/api/v1/modifications")
        .then(response => response.json())
        .then(styles => {
            Object.keys(styles).forEach(selector => {
                let element = document.querySelector(selector);
                if (element) {
                    let style = styles[selector];
                    element.style.backgroundColor = style.backgroundColor;
                    element.style.color = style.color;
                    element.style.fontSize = style.fontSize;
                }
            });
        });

    console.log("🎉 SquareCraft Widget is Ready!");
});

// Helper Function: Convert RGB to HEX
function rgbToHex(rgb) {
    let match = rgb.match(/\d+/g);
    if (!match) return "#ffffff";
    return `#${match.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
}
