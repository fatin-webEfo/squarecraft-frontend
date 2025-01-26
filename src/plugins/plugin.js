import { useEffect, useState } from "react";
import axios from "axios";

const Plugin = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [styles, setStyles] = useState({
    backgroundColor: "#ffffff",
    color: "#000000",
    fontSize: "16px"
  });

  useEffect(() => {
    console.log("✅ SquareCraft Plugin Loaded");

    const storedUser = localStorage.getItem("squarCraft_user");
    if (!storedUser) {
      console.error("No user token found. Unauthorized.");
      return;
    }
console.log("🎯 user:", storedUser);
    const userToken = JSON.parse(storedUser).squarCraft_auth_token;

    axios
      .get("https://webefo-backend.vercel.app/api/v1/modifications", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log("Fetched saved styles:", response.data);
        applySavedStyles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching saved styles:", error);
      });
  }, []);

  const applySavedStyles = (stylesData) => {
    Object.keys(stylesData).forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        const style = stylesData[selector];
        element.style.backgroundColor = style.backgroundColor;
        element.style.color = style.color;
        element.style.fontSize = style.fontSize;
      }
    });
  };

  const handleElementSelect = (event) => {
    if (
      event.target.id !== "squarecraft-widget" &&
      event.target.id !== "squarecraft-panel"
    ) {
      setSelectedElement(event.target);
      console.log("🎯 Selected:", event.target);

      const computedStyle = window.getComputedStyle(event.target);
      setStyles({
        backgroundColor: computedStyle.backgroundColor,
        color: computedStyle.color,
        fontSize: parseInt(computedStyle.fontSize, 10) + "px",
      });
    }
  };

  const handleApplyChanges = () => {
    if (!selectedElement) return;

    const storedUser = localStorage.getItem("squarCraft_user");
    if (!storedUser) {
      console.error("No user token found. Cannot save styles.");
      return;
    }

    const userToken = JSON.parse(storedUser).squarCraft_auth_token;

    selectedElement.style.backgroundColor = styles.backgroundColor;
    selectedElement.style.color = styles.color;
    selectedElement.style.fontSize = styles.fontSize;

    axios
      .post(
        "https://webefo-backend.vercel.app/api/v1/modifications",
        {
          elementSelector: selectedElement.tagName + "" + selectedElement.className,
          styles,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        console.log("Styles saved to backend:", response.data);
      })
      .catch((error) => {
        console.error("Error saving styles:", error);
      });
  };

  return (
    <>
      <div
        id="squarecraft-widget"
        className="fixed bottom-5 right-5 w-12 h-12 bg-orange-500 text-white flex items-center justify-center rounded-full shadow-lg cursor-pointer"
        onClick={() =>
          document.getElementById("squarecraft-panel").classList.toggle("hidden")
        }
      >
        ⚙️
      </div>

      <div
        id="squarecraft-panel"
        className="hidden fixed bottom-20 right-5 bg-white p-4 shadow-lg rounded-md"
      >
        <label className="block">Background:</label>
        <input
          type="color"
          value={styles.backgroundColor}
          onChange={(e) => setStyles({ ...styles, backgroundColor: e.target.value })}
          className="border border-gray-300 rounded"
        />

        <label className="block">Text Color:</label>
        <input
          type="color"
          value={styles.color}
          onChange={(e) => setStyles({ ...styles, color: e.target.value })}
          className="border border-gray-300 rounded"
        />

        <label className="block">Font Size:</label>
        <input
          type="number"
          value={parseInt(styles.fontSize, 10)}
          onChange={(e) =>
            setStyles({ ...styles, fontSize: e.target.value + "px" })
          }
          className="border border-gray-300 rounded"
        />

        <button
          onClick={handleApplyChanges}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Apply
        </button>
      </div>

      <div
        onClick={handleElementSelect}
        className="absolute top-0 left-0 w-full h-full"
      ></div>
    </>
  );
};

export default Plugin;
