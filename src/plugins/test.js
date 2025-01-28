import { createRoot } from "react-dom/client";
import ParentWidget from "../pages/PluginTest/ParentWidget/ParentWidget.jsx";

// Function to add Tailwind CSS dynamically
const addTailwindCSS = () => {
    if (!document.getElementById("tailwind-styles")) {
        const link = document.createElement("link");
        link.id = "tailwind-styles";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/tailwindcss@3.4.2/dist/tailwind.min.css";
        document.head.appendChild(link);
    }
};

// Call the function to add Tailwind CSS
addTailwindCSS();

// Function to render the widget
const renderWidget = () => {
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

    const root = createRoot(widgetContainer);
    root.render(<ParentWidget />);
};

// Render the widget
renderWidget();

// Optional: Observe DOM changes to ensure the widget persists
const observer = new MutationObserver(() => {
    if (!document.getElementById("squarecraft-widget")) {
        renderWidget();
    }
});
observer.observe(document.body, { childList: true, subtree: true });
