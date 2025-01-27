(function () {
  // Add widget CSS
  const style = document.createElement("style");
  style.textContent = `
    #parent-widget {
      position: absolute;
      top: 20px;
      left: 20px;
      cursor: grab;
      z-index: 9999;
      font-family: Arial, sans-serif;
    }

    .widget-container {
      width: 380px;
      font-weight: 300;
      background-color: #2c2c2c;
      color: white;
      font-size: 14px;
      padding: 16px;
      border-radius: 18px;
      border: 1.5px solid #3D3D3D;
    }

    .widget-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .widget-logo {
      width: 144px;
    }

    .auto-save-container {
      background-color: #3D3D3D;
      border-radius: 9999px;
      padding: 4px 8px;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }

    .widget-divider {
      width: 100%;
      height: 1px;
      border-top: 1px dotted #494949;
      margin-top: 20px;
    }

    .widget-tabs {
      display: flex;
      justify-content: flex-start;
      gap: 12px;
      margin-top: 16px;
    }

    .widget-tab {
      cursor: pointer;
      padding: 0 14px;
    }

    .progress-bar-container {
      background-color: #494949;
      height: 2px;
      width: 100%;
      margin-top: 12px;
      position: relative;
    }

    .progress-bar {
      background-color: #EF7C2F;
      height: 2px;
      width: 64px;
      position: absolute;
      top: 0;
      left: 0;
    }

    .widget-section {
      background-color: #3D3D3D;
      border-radius: 15px;
      margin-top: 16px;
      padding: 16px;
    }

    .toggle-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .toggle-button {
      background-color: #EF7C2F;
      border-radius: 22px;
      height: 15px;
      width: 26px;
      padding: 1px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .toggle-circle {
      background-color: #F2F2F2;
      border-radius: 6px;
      height: 13px;
      width: 13px;
    }
  `;
  document.head.appendChild(style);

  // Add the widget HTML
  const widget = document.createElement("div");
  widget.id = "parent-widget";
  widget.innerHTML = `
    <div class="widget-container">
      <div class="widget-header">
        <img src="https://via.placeholder.com/144" class="widget-logo" alt="Logo">
        <div class="auto-save-container">
          <p>Auto save</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18Z" fill="white" />
          </svg>
        </div>
      </div>
      <p class="widget-description">SquareCraft: Empowering Creativity for Your Squarespace Experience</p>
      <div class="widget-divider"></div>
      <div class="widget-tabs">
        <p class="widget-tab">Design</p>
        <p class="widget-tab">Advanced</p>
        <p class="widget-tab">Presets</p>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
      <div class="widget-section">
        <div class="toggle-container">
          <div class="toggle-button">
            <div class="toggle-circle"></div>
          </div>
          <p>Enable</p>
        </div>
      </div>
    </div>
  `;

  // Append widget to the body
  document.body.appendChild(widget);

  // Dragging functionality
  let offset = { x: 0, y: 0 };
  let isDragging = false;

  widget.addEventListener("mousedown", function (e) {
    if (e.target.tagName === "P" || e.target.tagName === "IMG" || e.target.closest(".no-drag")) {
      return; // Prevent dragging on non-empty sections
    }

    const rect = widget.getBoundingClientRect();
    offset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    isDragging = true;

    const handleMouseMove = (event) => {
      if (isDragging) {
        widget.style.left = `${event.clientX - offset.x}px`;
        widget.style.top = `${event.clientY - offset.y}px`;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });
})();
