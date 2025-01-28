
import React, { useRef, useState } from 'react';
import logo from "../../../../public/widget/photos/logo/widgetLogo.jpg";
import "./WidgetTypoHover.css";

const WidgetTypoHover = () => {
    const [isHoverActive, setIsHoverActive] = useState(false);
    const widgetRef = useRef(null);
    let offset = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
        if (e.target.tagName !== "DIV" || e.target.classList.contains("no-drag")) {
        return;
        }

    const widget = widgetRef.current;
    const rect = widget.getBoundingClientRect();
    offset = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    const handleMouseMove = (event) => {
      widget.style.left = `${event.clientX - offset.x}px`;
      widget.style.top = `${event.clientY - offset.y}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="widget-container"
      ref={widgetRef}
      onMouseDown={handleMouseDown}
    >
      <div className="widget-content">
        <div className="header">
          <img src={logo} className="logo" alt="Logo" />
          <div className="auto-save">
            <p>Auto save</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM4.65915 4.5C4.65915 4.08579 4.99494 3.75 5.40915 3.75C5.82337 3.75 6.15915 4.08579 6.15915 4.5C6.15915 4.75381 6.44844 4.90739 6.67326 4.78962C7.33101 4.44508 8.07964 4.25 8.87402 4.25C11.4974 4.25 13.624 6.37665 13.624 9C13.624 11.6234 11.4974 13.75 8.87402 13.75C6.65969 13.75 4.80097 12.2355 4.27371 10.1869C4.17047 9.7858 4.41196 9.37692 4.8131 9.27367C5.21424 9.17043 5.62312 9.41192 5.72637 9.81306C6.08719 11.215 7.36068 12.25 8.87402 12.25C10.6689 12.25 12.124 10.7949 12.124 9C12.124 7.20507 10.6689 5.75 8.87402 5.75C8.3586 5.75 7.87103 5.86991 7.43779 6.08364C7.1105 6.2451 7.2053 6.68316 7.55898 6.77316C7.9604 6.87531 8.20301 7.28354 8.10086 7.68496C7.99871 8.08638 7.59049 8.32899 7.18907 8.22684L5.22419 7.72684C4.89181 7.64225 4.65915 7.34298 4.65915 7V4.5Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <p className="description">SquareCraft: Empowering Creativity for Your Squarespace Experience</p>
        <div className="divider"></div>
        <div className="tabs">
          <p>Design</p>
          <p>Advanced</p>
          <p>Presets</p>
        </div>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
        <div className="footer">

          <div className="typography">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" fill="none">
              <path d="M5 2.5H3C2.46957 2.5 1.96086 2.71071 1.58579 3.08579C1.21071 3.46086 1 3.96957 1 4.5V16.5C1 17.0304 1.21071 17.5391 1.58579 17.9142C1.96086 18.2893 2.46957 18.5 3 18.5H13C13.5304 18.5 14.0391 18.2893 14.4142 17.9142C14.7893 17.5391 15 17.0304 15 16.5V4.5C15 3.96957 14.7893 3.46086 14.4142 3.08579C14.0391 2.71071 13.5304 2.5 13 2.5H11" stroke="#FDECD7" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 9.5V8.5H11V9.5M8 8.5V14.5M7 14.5H9M5 2.5C5 1.96957 5.21071 1.46086 5.58579 1.08579C5.96086 0.710714 6.46957 0.5 7 0.5H9C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5H7C6.46957 4.5 5.96086 4.28929 5.58579 3.91421C5.21071 3.53914 5 3.03043 5 2.5Z" stroke="#FDECD7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>Typography</p>
          </div>

          <div className="settings">
            <div className="toggle">
              <div className="toggle-switch">
                <div className="toggle-indicator"></div>
              </div>
              <p>Enable</p>
            </div>
            <div className="reset">
              <p>Reset</p>
              {/* Add SVG here */}
            </div>
          </div>

          {/* Buttons */}
          <div className="buttons">
            <button className="btn normal" onClick={() => setIsHoverActive(false)}>Normal</button>
            <button className="btn hover" onClick={() => setIsHoverActive(true)}>Hover</button>
          </div>

          {/* Color Section */}
          <div>
            <div className="color-section">
                <p>Color</p>
                {/* Add SVG here */}
            </div>
              {/* Color Section */}
            {isHoverActive && (
                <div className="color-inputs">
                    <div className="color-box">
                    <p>#F2F2F2</p>
                    <div className="color-preview"></div>
                    </div>
                    <div className="color-box">
                    <p>#F2F2F2</p>
                    <div className="color-preview"></div>
                    </div>
                    <div className="timing-box">
                        <p>0.8s</p>
                        <div className="arrows">
                            {/* Add SVG arrows here */}
                                <svg
                                className="cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="6"
                                viewBox="0 0 13 6"
                                fill="none"
                                >
                                <path
                                    d="M1.5 5L6.5 1L11.5 5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                </svg>

                                {/* Down Arrow */}
                                <svg
                                className="cursor-pointer rotate-180"
                                xmlns="http://www.w3.org/2000/svg"
                                width="13"
                                height="6"
                                viewBox="0 0 13 6"
                                fill="none"
                                >
                                <path
                                    d="M11.5 5L6.5 1L1.5 5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                </svg> 
                        </div>
                    </div>
                </div>
            )}
          </div>

          {/* Additional Controls */}
          <div className="additional-controls">
            <div className="control-box">
              <p>Regular</p>
              {/* Add SVG here */}
            </div>
            <div className="control-box">
              <p>3px</p>
              {/* Add SVG here */}
            </div>
            <div className="control-box">
              <p>Auto</p>
              {/* Add SVG here */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WidgetTypoHover;
