(async function () {
    console.log("✅ SquareCraft Plugin Loaded");

    // Function to dynamically add Tailwind CSS
    function addTailwindCSS() {
        if (!document.getElementById("tailwind-styles")) {
            const link = document.createElement("link");
            link.id = "tailwind-styles";
            link.rel = "stylesheet";
            link.href = "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.2/dist/tailwind.min.css";
            document.head.appendChild(link);
        }
    }

    // Add Tailwind CSS
    addTailwindCSS();

    // Function to render the React widget
    function renderWidget() {
        console.log("🎨 Rendering ParentWidget...");

        const targetElement = document.body.firstElementChild || document.body;

        let widgetContainer = document.getElementById("squarecraft-widget");
        if (!widgetContainer) {
            widgetContainer = document.createElement("div");
            widgetContainer.id = "squarecraft-widget";
            widgetContainer.style.position = "fixed";
            widgetContainer.style.bottom = "20px";
            widgetContainer.style.right = "20px";
            widgetContainer.style.zIndex = "9999";
            targetElement.appendChild(widgetContainer);
        }

        // Use ReactDOM to render the widget
        const { createRoot }  =  import("react-dom/client");
        const ParentWidget = ( import("../pages/PluginTest/ParentWidget/ParentWidget.jsx")).default;

        const root = createRoot(widgetContainer);
        root.render(<ParentWidget />);
    }

    // Call renderWidget to initialize the widget
    renderWidget();

    // Observe DOM mutations to ensure the widget persists
    const observer = new MutationObserver(() => {
        if (!document.getElementById("squarecraft-widget")) {
            console.log("🔄 Widget missing, re-rendering...");
            renderWidget();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
