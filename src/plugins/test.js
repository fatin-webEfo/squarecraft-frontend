import { createRoot } from "react-dom/client";
import ParentWidget from "../pages/PluginTest/ParentWidget/ParentWidget.jsx";

const renderWidget = () => {
  let widgetContainer = document.getElementById("squarecraft-widget");
  if (!widgetContainer) {
    widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget";
    document.body.appendChild(widgetContainer);
  }

  const root = createRoot(widgetContainer);
  root.render(<ParentWidget />);
};


window.renderSquarecraftWidget = renderWidget;

renderWidget();
