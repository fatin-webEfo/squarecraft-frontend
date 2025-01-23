import React, { useEffect, useState } from "react";
import axios from "axios";
const Test = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [styles, setStyles] = useState({
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: "16px"
  });
  useEffect(() => {
    console.log("✅ SquareCraft Plugin Loaded");

    // Load saved styles from the backend
    axios.get("http://localhost:8000/api/v1/modifications", {
      withCredentials: true
    }).then(response => {
      console.log("Fetched saved styles:", response.data);
      applySavedStyles(response.data);
    }).catch(error => console.error("Error fetching saved styles:", error));
  }, []);
  const applySavedStyles = stylesData => {
    Object.keys(stylesData).forEach(selector => {
      let element = document.querySelector(selector);
      if (element) {
        let style = stylesData[selector];
        element.style.backgroundColor = style.backgroundColor;
        element.style.color = style.color;
        element.style.fontSize = style.fontSize;
      }
    });
  };
  const handleElementSelect = event => {
    if (event.target.id !== "squarecraft-widget" && event.target.id !== "squarecraft-panel") {
      setSelectedElement(event.target);
      console.log("🎯 Selected:", event.target);

      // Get current styles of selected element
      const computedStyle = window.getComputedStyle(event.target);
      setStyles({
        backgroundColor: computedStyle.backgroundColor,
        color: computedStyle.color,
        fontSize: parseInt(computedStyle.fontSize) + "px"
      });
    }
  };
  const handleApplyChanges = () => {
    if (selectedElement) {
      selectedElement.style.backgroundColor = styles.backgroundColor;
      selectedElement.style.color = styles.color;
      selectedElement.style.fontSize = styles.fontSize;

      // Save styles to backend
      axios.post("http://localhost:8000/api/v1/modifications", {
        elementSelector: selectedElement.tagName + "." + selectedElement.className,
        styles
      }, {
        withCredentials: true
      }).then(response => console.log("Styles saved to backend:", response.data)).catch(error => console.error("Error saving styles:", error));
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "squarecraft-widget",
    className: "fixed bottom-5 right-5 w-12 h-12 bg-orange-500 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer",
    onClick: () => document.getElementById("squarecraft-panel").classList.toggle("hidden")
  }, "\u2699"), /*#__PURE__*/React.createElement("div", {
    id: "squarecraft-panel",
    className: "hidden fixed bottom-20 right-5 bg-white p-4 shadow-lg rounded-md"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block"
  }, "Background:"), /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: styles.backgroundColor,
    onChange: e => setStyles({
      ...styles,
      backgroundColor: e.target.value
    }),
    className: "border border-gray-300 rounded"
  }), /*#__PURE__*/React.createElement("label", {
    className: "block"
  }, "Text Color:"), /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: styles.color,
    onChange: e => setStyles({
      ...styles,
      color: e.target.value
    }),
    className: "border border-gray-300 rounded"
  }), /*#__PURE__*/React.createElement("label", {
    className: "block"
  }, "Font Size:"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: parseInt(styles.fontSize),
    onChange: e => setStyles({
      ...styles,
      fontSize: e.target.value + "px"
    }),
    className: "border border-gray-300 rounded"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: handleApplyChanges,
    className: "bg-blue-500 text-white px-4 py-2 rounded mt-2"
  }, "Apply")), /*#__PURE__*/React.createElement("div", {
    onClick: handleElementSelect,
    className: "absolute top-0 left-0 w-full h-full"
  }));
};
export default Test;
