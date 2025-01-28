// Add this JavaScript to your project as a separate file or inline script

// Initialize the widget
document.addEventListener("DOMContentLoaded", () => {
    const widgetContainer = document.createElement("div");
    widgetContainer.className = "widget-container";
  
    // Set initial position and draggable behavior
    let offset = { x: 0, y: 0 };
  
    widgetContainer.addEventListener("mousedown", (e) => {
      if (!e.target.closest(".widget-content")) return;
  
      const rect = widgetContainer.getBoundingClientRect();
      offset = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
  
      const handleMouseMove = (event) => {
        widgetContainer.style.left = `${event.clientX - offset.x}px`;
        widgetContainer.style.top = `${event.clientY - offset.y}px`;
      };
  
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
  
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    });


    const Link = document.createElement("link");
    Link.rel = "stylesheet";
    Link.id = "squarecraft-styles";
    Link.rel = "stylesheet";
    Link.type = "text/css";
    Link.href = "./ParentWidget.css"; // Path to your CSS file
    document.head.appendChild(Link);
  
    widgetContainer.innerHTML = `
    <div
      class="widget-container"
      ref={widgetRef}
    >
      <div class="widget-content">
        <div class="header">
          <img src="../public/widget/photos/logo/widgetLogo.jpg" alt="image" />
          <div class="auto-save">
            <p>Auto save</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM4.65915 4.5C4.65915 4.08579 4.99494 3.75 5.40915 3.75C5.82337 3.75 6.15915 4.08579 6.15915 4.5C6.15915 4.75381 6.44844 4.90739 6.67326 4.78962C7.33101 4.44508 8.07964 4.25 8.87402 4.25C11.4974 4.25 13.624 6.37665 13.624 9C13.624 11.6234 11.4974 13.75 8.87402 13.75C6.65969 13.75 4.80097 12.2355 4.27371 10.1869C4.17047 9.7858 4.41196 9.37692 4.8131 9.27367C5.21424 9.17043 5.62312 9.41192 5.72637 9.81306C6.08719 11.215 7.36068 12.25 8.87402 12.25C10.6689 12.25 12.124 10.7949 12.124 9C12.124 7.20507 10.6689 5.75 8.87402 5.75C8.3586 5.75 7.87103 5.86991 7.43779 6.08364C7.1105 6.2451 7.2053 6.68316 7.55898 6.77316C7.9604 6.87531 8.20301 7.28354 8.10086 7.68496C7.99871 8.08638 7.59049 8.32899 7.18907 8.22684L5.22419 7.72684C4.89181 7.64225 4.65915 7.34298 4.65915 7V4.5Z"
                  fill="white"
                />
              </svg>
              
          </div>
        </div>
        <p class="description">SquareCraft: Empowering Creativity for Your Squarespace Experience</p>
        <div class="divider"></div>
        <div class="tabs">
          <p>Design</p>
          <p>Advanced</p>
          <p>Presets</p>
        </div>
        <div class="progress-bar">
          <div class="progress"></div>
        </div>
        <div class="footer">

          <div class="typography">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" fill="none" stroke="#FDECD7" stroke-width="1">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5 2.5H3C2.46957 2.5 1.96086 2.71071 1.58579 3.08579C1.21071 3.46086 1 3.96957 1 4.5V16.5C1 17.0304 1.21071 17.5391 1.58579 17.9142C1.96086 18.2893 2.46957 18.5 3 18.5H13C13.5304 18.5 14.0391 18.2893 14.4142 17.9142C14.7893 17.5391 15 17.0304 15 16.5V4.5C15 3.96957 14.7893 3.46086 14.4142 3.08579C14.0391 2.71071 13.5304 2.5 13 2.5H11"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5 9.5V8.5H11V9.5M8 8.5V14.5M7 14.5H9M5 2.5C5 1.96957 5.21071 1.46086 5.58579 1.08579C5.96086 0.710714 6.46957 0.5 7 0.5H9C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5H7C6.46957 4.5 5.96086 4.28929 5.58579 3.91421C5.21071 3.53914 5 3.03043 5 2.5Z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              
            <p>Typography</p>
          </div>

          <div class="divider"></div>

          <div class="settings">
            <div class="toggle">
              <div class="toggle-switch">
                <div class="toggle-indicator"></div>
              </div>
              <p>Enable</p>
            </div>
            <div class="reset">
                <p>Reset</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM4.65915 4.5C4.65915 4.08579 4.99494 3.75 5.40915 3.75C5.82337 3.75 6.15915 4.08579 6.15915 4.5C6.15915 4.75381 6.44844 4.90739 6.67326 4.78962C7.33101 4.44508 8.07964 4.25 8.87402 4.25C11.4974 4.25 13.624 6.37665 13.624 9C13.624 11.6234 11.4974 13.75 8.87402 13.75C6.65969 13.75 4.80097 12.2355 4.27371 10.1869C4.17047 9.7858 4.41196 9.37692 4.8131 9.27367C5.21424 9.17043 5.62312 9.41192 5.72637 9.81306C6.08719 11.215 7.36068 12.25 8.87402 12.25C10.6689 12.25 12.124 10.7949 12.124 9C12.124 7.20507 10.6689 5.75 8.87402 5.75C8.3586 5.75 7.87103 5.86991 7.43779 6.08364C7.1105 6.2451 7.2053 6.68316 7.55898 6.77316C7.9604 6.87531 8.20301 7.28354 8.10086 7.68496C7.99871 8.08638 7.59049 8.32899 7.18907 8.22684L5.22419 7.72684C4.89181 7.64225 4.65915 7.34298 4.65915 7V4.5Z"
                      fill="white"
                    />
                  </svg>
              </div>
              
          </div>

          <!-- {/* Buttons */} -->
          <div class="buttons">
            <button class="btn normal" onclick="handleNormalClick()">Normal</button>
            <button class="btn hover" onclick="handleHoverClick()">Hover</button>
          </div>

          <!-- {/* Color Section */} -->
          <div class='color-section-container' style="display: none;">
            <div class="color-section" >
                <p>Color</p>
                <p>Background Color</p>
                <p>Delay</p>
        
            </div>
            
            <div class="color-inputs">
                <div class="color-box">
                <p>#F2F2F2</p>
                <div class="color-preview"></div>
                </div>
                <div class="color-box">
                <p>#F2F2F2</p>
                <div class="color-preview"></div>
                </div>
                <div class="timing-box">
                    <p>0.8s</p>
                    <div class="arrows">
                        <!-- {/* Add SVG arrows here */} -->
                        <svg
                            class="cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="6"
                            viewBox="0 0 13 6"
                            fill="none"
                            >
                            <path
                                d="M1.5 5L6.5 1L11.5 5"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>


                        <!-- {/* Down Arrow */} -->
                        <svg
                            class="cursor-pointer rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="6"
                            viewBox="0 0 13 6"
                            fill="none"
                            >
                            <path
                                d="M11.5 5L6.5 1L1.5 5"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>

 
                    </div>
                </div>
            </div>

              <!-- {/* duration section code start */} -->
            <div>
                <div class="duration-section" >
                    <p>Duration</p>
                    <p>Easing</p>
                </div>
                
                <div class="color-inputs">
                    <div class="timing-box">
                        <p>300ms</p>
                        <div class="arrows">
                            <!-- {/* Add SVG arrows here */} -->
                                <svg
                                class="cursor-pointer"
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

                                <!-- {/* Down Arrow */} -->
                                <svg
                                class="cursor-pointer rotate-180"
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
                    <div class="timing-box">
                        <p style="font-size: 12px;">Ease In Out</p>
                        <div class="arrows">
                            <!-- {/* Add SVG arrows here */} -->
                                <svg
                                class="cursor-pointer"
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

                                <!-- {/* Down Arrow */} -->
                                <svg
                                class="cursor-pointer rotate-180"
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
            </div>
            <!-- {/* duration section code end */} -->

            <!-- {/* hover animation code start */} -->
            <div>
                <div class="duration-section" >
                    <p>Hover Animation</p>
                </div>
                
                <div class="color-inputs">
                    <div class="timing-box">
                        <p>Scale</p>
                        <div class="arrows">
                            <!-- {/* Add SVG arrows here */} -->
                                <svg
                                class="cursor-pointer"
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

                                <!-- {/* Down Arrow */} -->
                                <svg
                                class="cursor-pointer rotate-180"
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
            </div>
            <!-- {/* hover animation code end */} -->
          </div>
          
        </div>
      </div>
    </div>

    `;
  
    // Append widget to the body
    document.body.appendChild(widgetContainer);
  
    // Style widget with CSS
    const style = document.createElement("style");
    style.textContent = `
      
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

    .widget-container {
        position: absolute;
        top: 100px;
        left: 100px;
        cursor: grab;
        font-family: "Roboto", serif;
      }
      
      .widget-content {
        width: 380px;
        background: #2c2c2c;
        color: white;
        font-size: 0.875rem;
        border-radius: 18px;
        border: 1.5px solid #3d3d3d;
        padding: 16px;
      }
      
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .logo {
        width: 144px;
      }
      
      .auto-save {
        background: #3d3d3d;
        padding: 4px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        height: 28px;
        width: 110px;
        text-align: center;
        justify-content: center;
      }
      
      .description {
        margin-top: 24px;
        opacity: 0.7;
      }
      
      .divider {
        width: 100%;
        height: 1px;
        background: #494949;
        /* border-style: dotted; */
        margin-top: 12px;
      }
      
      .tabs {
        display: flex;
        gap: 70px;
        margin-top: 4px;
      }
      
      .tabs p {
        cursor: pointer;
      }
      
      .progress-bar {
        width: 100%;
        height: 2px;
        background: #494949;
        margin-top: 12px;
        position: relative;
      }
      
      .progress {
        width: 64px;
        height: 2px;
        background: #ef7c2f;
        position: absolute;
        top: 0;
        left: 0;
      }
      
      .footer {
        margin-top: 16px;
        padding: 16px;
        background: #3d3d3d;
        border-radius: 15px;
      }
      
      .typography {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .typography svg {
        stroke: #fdecd7;
      }
      
      .settings {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 4px;
      }
      
      .toggle {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .toggle-switch {
        width: 26px;
        height: 15px;
        background: #ef7c2f;
        border-radius: 22px;
        position: relative;
      }
      
      .toggle-indicator {
        width: 13px;
        height: 13px;
        background: #f2f2f2;
        border-radius: 50%;
        position: absolute;
        top: 1px;
        left: 1px;
      }
      
      .reset {
        background: #494949;
        padding: 4px 10px;
        border-radius: 50px;
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        width: 80px;
        height: 28px;
        display: flex;
        justify-content: center;
      }
      
      .buttons {
        display: flex;
        gap: 12px;
        margin-top: 12px;
      }
      
      .btn {
        width: 100%;
        text-align: center;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.3s ease;
      }
      
      .btn.normal {
        background: #494949;
        color: white;
        
      }
      
      .btn.hover {
        background: #ef7c2f;
        color: white;
      }
      
      .btn.normal:hover {
        background: #d87838;
        color: white;

      }
      
      .btn.hover:hover {
        background: #494848;
        color: white;

      }
      
      .color-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 12px;
      }

      .color-section p{
        font-size: 12px;
      }

      .duration-section{
        display: flex;
        align-items: center;
        gap: 80px;
      }
      
      .color-inputs {
        display: flex;
        gap: 16px;
      }

      .color-box{
        height: 15px;
        width: 86px;
      }

      .color-box p{
        font-size: 12px;
      }
      
      .color-box,
      .timing-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #3f3f3f;
        padding: 8px;
        border: 1px solid #585858;
        border-radius: 8px;
        gap: 20px;
        height: 35px;
        width: 113px;
      }
      
      .color-preview {
        width: 16px;
        height: 16px;
        background: #ffac33;
        border-radius: 10%;
      }
      
      .timing-box .arrows {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
      }
      
      .additional-controls {
        display: flex;
        gap: 12px;
        margin-top: 12px;
      }
      
      .control-box {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #3f3f3f;
        padding: 8px;
        border: 1px solid #585858;
        border-radius: 8px;
      }

      .cursor-pointer {
        cursor: pointer;
      }
      
      .rotate-180 {
        transform: rotate(180deg);
      }
  
    `;
    document.head.appendChild(style);
  
    // Button event listeners
    document.querySelector(".btn.normal").addEventListener("click", () => {
      document.querySelector(".color-section-container").style.display = "none";
    });
  
    document.querySelector(".btn.hover").addEventListener("click", () => {
      document.querySelector(".color-section-container").style.display = "block";
    });
  });
  