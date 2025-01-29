(async function () {
    console.log("✅ SquareCraft Plugin Loaded");
  
    const widgetContainer = document.createElement("div");
    widgetContainer.id = "squarecraft-widget-container";
    widgetContainer.style.position = "fixed";
    widgetContainer.style.top = "100px";
    widgetContainer.style.left = "100px";
    widgetContainer.style.cursor = "grab";
    widgetContainer.style.zIndex = "9999";
  
    const link = document.createElement("link");
    link.id = "squarecraft-styles";
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href ="https://fatin-webefo.github.io/squarecraft-frontend/src/pages/PluginTest/ParentWidget/ParentWidget.css"
    document.head.appendChild(link);
  
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-3.6.0.min.js";
    jqueryScript.type = "text/javascript";
    jqueryScript.onload = function () {
      console.log("✅ jQuery has been successfully loaded");
    };
    document.head.appendChild(jqueryScript);

    function findSquarespaceToolbar() {
      console.log("🔍 Searching for Squarespace Toolbar...");
  
      // Select the toolbar using attributes instead of dynamic class names
      let toolbar = document.querySelector('[data-guidance-engine="guidance-engine-device-view-button-container"]');
  
      if (!toolbar) {
          console.warn("⚠️ Toolbar not found normally. Checking Shadow DOM...");
  
          // Search inside Shadow DOM elements
          document.querySelectorAll('*').forEach(el => {
              if (el.shadowRoot) {
                  const shadowElement = el.shadowRoot.querySelector('[data-guidance-engine="guidance-engine-device-view-button-container"]');
                  if (shadowElement) {
                      console.log("✅ Toolbar found inside Shadow DOM:", shadowElement);
                      toolbar = shadowElement;
                  }
              }
          });
      }
  
      if (toolbar) {
          console.log("🎯 Found Squarespace Toolbar:", toolbar);
          return toolbar;
      } else {
          console.warn("🚨 Toolbar Not Found. Retrying...");
          return null;
      }
  }
  
  // 🔍 Mutation Observer to Wait for Toolbar to Load
  function observeToolbar() {
      console.log("📡 Observing DOM for Toolbar...");
  
      let retries = 0;
      const maxRetries = 10;
  
      const observer = new MutationObserver(() => {
          let toolbar = findSquarespaceToolbar();
          if (toolbar && !toolbar.querySelector("[data-squarecraft-icon]")) {
              console.log("📌 Toolbar Found! Injecting Plugin Icon...");
              injectPluginIcon(toolbar);
              observer.disconnect();
          } else {
              retries++;
              if (retries >= maxRetries) {
                  console.error("❌ Toolbar Not Found after multiple attempts. Stopping observer.");
                  observer.disconnect();
              } else {
                  console.warn(`🔄 Retrying... Attempt ${retries}/${maxRetries}`);
              }
          }
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
  
      // Backup: Force check after 5 seconds
      setTimeout(() => {
          let toolbar = findSquarespaceToolbar();
          if (toolbar) {
              console.log("✅ Found Toolbar via setTimeout!");
              injectPluginIcon(toolbar);
              observer.disconnect();
          }
      }, 5000);
  }
  
  // 🎨 Inject SquareCraft Plugin Icon
  function injectPluginIcon(toolbar) {
      if (!toolbar) {
          console.error("❌ Cannot inject icon: Toolbar is null.");
          return;
      }
  
      // Avoid duplicate icons
      if (!toolbar.querySelector("[data-squarecraft-icon]")) {
          console.log("🎨 Injecting SquareCraft Plugin Icon...");
  
          const pluginButton = document.createElement("button");
          pluginButton.setAttribute("data-squarecraft-icon", "true"); // Unique identifier
          pluginButton.style.border = "none";
          pluginButton.style.background = "transparent";
          pluginButton.style.cursor = "pointer";
          pluginButton.style.marginLeft = "10px";
  
          // Add plugin icon
          const img = document.createElement("img");
          img.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; // Your plugin logo
          img.alt = "SquareCraft Plugin";
          img.width = 24;
          img.height = 24;
          img.style.display = "block";
  
          pluginButton.appendChild(img);
          toolbar.appendChild(pluginButton);
  
          console.log("🎉 SquareCraft Icon Successfully Added!");
  
          // ✅ Click Event for Plugin
          pluginButton.addEventListener("click", function () {
              alert("SquareCraft Plugin Clicked!");
          });
      } else {
          console.warn("⚠️ SquareCraft Plugin Icon Already Exists. Skipping...");
      }
  }
  
  // 🚀 Run Everything
  observeToolbar();
  
  
  
  
  
    // https://i.ibb.co.com/LXKK6swV/Group-29.jpg ---- brand icon after clicking the widget will be loaded
    function addImageButton() {
      const toolbar = document.querySelector(".sqs-block-toolbar");

      if (toolbar) {
          console.log("✅ Squarespace Toolbar Found:", toolbar);

          if (!toolbar.querySelector(".custom-image-button")) {
              const imgButton = document.createElement("button");
              imgButton.className = "custom-image-button";
              imgButton.style.border = "none";
              imgButton.style.background = "transparent";
              imgButton.style.cursor = "pointer";
              imgButton.style.marginLeft = "8px";

              // Add an image inside the button
              const img = document.createElement("img");
              img.src = "https://i.ibb.co/LXKK6swV/Group-29.jpg"; // Update if needed
              img.alt = "Custom Plugin Icon";
              img.width = 22;
              img.height = 22;
              img.style.display = "block";

              imgButton.appendChild(img);
              toolbar.appendChild(imgButton);

              console.log("✅ Plugin Icon Successfully Added");

              // ✅ Add Click Event
              imgButton.addEventListener("click", function () {
                  alert("SquareCraft Plugin Clicked!");
              });
          }
      } else {
          console.warn("⚠️ Squarespace Toolbar Not Found! Waiting for element...");
          observeToolbar();
      }
  }




  addImageButton();



    widgetContainer.innerHTML = `
     <div
    class="squareCraft-pt-28" style="   
                 position: absolute;
                 top: 100px;
                 left: 100px;
                 cursor: grab;
                 width:300px;">
                 
                 <div class="squareCraft-w-300px  squareCraft-font-light squareCraft-bg-color-2c2c2c squareCraft-text-color-white squareCraft-text-sm  squareCraft-p-4 mx-auto"
                     style="
                     padding-bottom: 20px;
                         border-radius: 18px;
                         border: 1.5px solid var(--Black-900, #3D3D3D);
                     "
                 >
                     <div class="squareCraft-w-full squareCraft-justify-between squareCraft-flex squareCraft-items-center">
                         <img src="https://i.ibb.co.com/XtntdPq/widget-Logo.jpg" class="squareCraft-w-36" alt="" />
                         <div class="squareCraft-rounded-full squareCraft-bg-color-3d3d3d squareCraft-px-2 squareCraft-py-1px cursor-pointer squareCraft-flex squareCraft-items-center squareCraft-justify-center squareCraft-gap-1">
                             <p class="squareCraft-text-sm squareCraft-margin-0">Auto save</p>
                             <img src="https://i.ibb.co.com/B2NjHwSq/redo-rectangle.png" class="squareCraft-w-10" alt="">
                         </div>
                     </div>
                     <p class="squareCraft-mt-6 squareCraft-text-ellipsis squareCraft-opacity-70">SquareCraft: Empowering Creativity for Your Squarespace Experience</p>
                     <div class="squareCraft-w-full squareCraft-h-1px squareCraft-border-t squareCraft-border-dotted squareCraft-bg-color-494949 squareCraft-border-0 squareCraft-mt-5"></div>
                     <div class="squareCraft-mt-4 squareCraft-flex squareCraft-items-center squareCraft-w-full">
                         <div class="squareCraft-flex squareCraft-items-center squareCraft-w-full squareCraft-gap-5">
                             <p class="squareCraft-px-3.5 cursor-pointer">Design</p>
                             <p class="squareCraft-px-3.5 cursor-pointer">Advanced</p>
                             <p class="squareCraft-px-3.5 cursor-pointer">Presets</p>
                         </div>
                     </div>
                     <div class="squareCraft-mb-4 squareCraft-bg-color-494949 squareCraft-w-full squareCraft-h-2px squareCraft-mt-3 squareCraft-relative">
                         <div class="squareCraft-absolute squareCraft-bg-color-EF7C2F squareCraft-h-2px squareCraft-top-0 squareCraft-left-0 squareCraft-w-16"></div>
                     </div>
     
                     <div class="squareCraft-mt-4 squareCraft-pb-2 squareCraft-rounded-15px squareCraft-bg-color-3d3d3d ">
                         <div class="squareCraft-flex squareCraft-items-center squareCraft-px-3 squareCraft-pt-2 squareCraft-justify-between ">
                             <div class="squareCraft-flex squareCraft-items-center squareCraft-gap-2">
                                 <svg xmlns="http://www.w3.org/2000/svg" class="" width="16" height="19" viewBox="0 0 16 19" fill="none">
                                     <path d="M5 2.5H3C2.46957 2.5 1.96086 2.71071 1.58579 3.08579C1.21071 3.46086 1 3.96957 1 4.5V16.5C1 17.0304 1.21071 17.5391 1.58579 17.9142C1.96086 18.2893 2.46957 18.5 3 18.5H13C13.5304 18.5 14.0391 18.2893 14.4142 17.9142C14.7893 17.5391 15 17.0304 15 16.5V4.5C15 3.96957 14.7893 3.46086 14.4142 3.08579C14.0391 2.71071 13.5304 2.5 13 2.5H11" stroke="#FDECD7" strokeLinecap="round" strokeLinejoin="round" />
                                     <path d="M5 9.5V8.5H11V9.5M8 8.5V14.5M7 14.5H9M5 2.5C5 1.96957 5.21071 1.46086 5.58579 1.08579C5.96086 0.710714 6.46957 0.5 7 0.5H9C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3.53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5H7C6.46957 4.5 5.96086 4.28929 5.58579 3.91421C5.21071 3.53914 5 3.03043 5 2.5Z" stroke="#FDECD7" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                                 <p class="squareCraft-text-16px squareCraft-font-semibold">Typography</p>
     
                             </div>
                             <div>
                                 <svg class="squareCraft-cursor-pointer squareCraft-rotate-180" xmlns="http://www.w3.org/2000/svg" width="13" height="6" viewBox="0 0 13 6" fill="none">
                                     <path d="M11.5 5L6.5 1L1.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                             </div>
                         </div>
     
                         <div class="squareCraft-bg-494949 squareCraft-mt-4 squareCraft-h-1px"></div>
                         <div class="squareCraft-px-3 ">
                             <div class="squareCraft-w-full squareCraft-flex squareCraft-items-center squareCraft-justify-between">
                                 <div class="squareCraft-flex squareCraft-items-center squareCraft-gap-2">
     
                                     <div class="squareCraft-cursor-pointer squareCraft-flex  squareCraft-items-center squareCraft-justify-end squareCraft-bg-EF7C2F  squareCraft-rounded-22px squareCraft-h-15px squareCraft-w-26px squareCraft-p-1px squareCraft-gap-10px squareCraft-relative">
                                         <div class="squareCraft-bg-F2F2F2 squareCraft-rounded-6px squareCraft-h-13px squareCraft-absolute squareCraft-right-1 squareCraft-top-1px squareCraft-w-13px "></div>
                                     </div>
                                     <p>Enable</p>
                                 </div>
     
                                 <div class="squareCraft-flex squareCraft-cursor-pointer squareCraft-items-center squareCraft-gap-2 squareCraft-rounded-full squareCraft-px-2_5 squareCraft-cursor-pointer squareCraft-py-1px squareCraft-bg-494949">
                                     <p class="squareCraft-margin-0">Reset</p>
                                     <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 8" fill="none">
                                         <path d="M3.99927 7.5C3.02218 7.5 2.19458 7.16094 1.51645 6.48281C0.83833 5.80469 0.499268 4.97708 0.499268 4C0.499268 3.02292 0.83833 2.19531 1.51645 1.51719C2.19458 0.839062 3.02218 0.5 3.99927 0.5C4.50239 0.5 4.98364 0.603833 5.44302 0.8115C5.90239 1.01917 6.29614 1.31638 6.62427 1.70312V0.5H7.49927V3.5625H4.43677V2.6875H6.27427C6.04093 2.27917 5.722 1.95833 5.31745 1.725C4.91291 1.49167 4.47352 1.375 3.99927 1.375C3.2701 1.375 2.65031 1.63021 2.13989 2.14062C1.62948 2.65104 1.37427 3.27083 1.37427 4C1.37427 4.72917 1.62948 5.34896 2.13989 5.85938C2.65031 6.36979 3.2701 6.625 3.99927 6.625C4.56073 6.625 5.0675 6.46458 5.51958 6.14375C5.97166 5.82292 6.28885 5.4 6.47114 4.875H7.38989C7.18573 5.64792 6.7701 6.27865 6.14302 6.76719C5.51593 7.25573 4.80135 7.5 3.99927 7.5Z" fill="#F6F6F6" />
                                     </svg>
                                 </div>
                             </div>
                             <div class="squareCraft-flex  squareCraft-items-center squareCraft-justify-between squareCraft-gap-2">
                                 <p class="squareCraft-text-center squareCraft-cursor-pointer squareCraft-bg-EF7C2F squareCraft-w-full squareCrafttext-center squareCraftrounded-md squareCraft-py-1px squareCraft-rounded-6px squareCraft-gap-10px squareCraft-hover:bg-d87838 squareCraft-transition-all squareCraft-duration-300">Normal</p>
                                 <p class="squareCraft-text-center squareCraft-cursor-pointer squareCraft-bg-494949 squareCraft-w-full squareCrafttext-center squareCraftrounded-md squareCraft-py-1px squareCraft-rounded-6px squareCraft-gap-10px squareCraft-hover:bg-494848 squareCraft-transition-all squareCraft-duration-300">Hover</p>
                             </div>
     
     
                             <div class="squareCraft-mt-2  squareCraft-flex squareCraft-items-center squareCraft-justify-between">
                                 <p class="squareCraft-opacity-65 squareCraft-margin-0">Text</p>
                                 <svg class="squareCraft-rotate-180" xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                                     <path d="M7 3C6.49368 3 6.00809 3.21071 5.65007 3.58579C5.29204 3.96086 5.09091 4.46957 5.09091 5C5.09091 5.53043 5.29204 6.03914 5.65007 6.41421C6.00809 6.78929 6.49368 7 7 7C7.50632 7 7.99191 6.78929 8.34993 6.41421C8.70796 6.03914 8.90909 5.53043 8.90909 5C8.90909 4.46957 8.70796 3.96086 8.34993 3.58579C7.99191 3.21071 7.50632 3 7 3ZM7 8.33333C6.15613 8.33333 5.34682 7.98214 4.75011 7.35702C4.15341 6.7319 3.81818 5.88406 3.81818 5C3.81818 4.11595 4.15341 3.2681 4.75011 2.64298C5.34682 2.01786 6.15613 1.66667 7 1.66667C7.84387 1.66667 8.65318 2.01786 9.24988 2.64298C9.84659 3.2681 10.1818 4.11595 10.1818 5C10.1818 5.88406 9.84659 6.7319 9.24988 7.35702C8.65318 7.98214 7.84387 8.33333 7 8.33333ZM7 0C3.81818 0 1.10091 2.07333 0 5C1.10091 7.92667 3.81818 10 7 10C10.1818 10 12.8991 7.92667 14 5C12.8991 2.07333 10.1818 0 7 0Z" fill="#6D6D6D" />
                                 </svg>
                             </div>
                             <div>
                                <div class="squareCraft-flex squareCraft-mt-2 squareCraft-gap-3">
                                    <input placeholder="1"  type="number" class="squareCraft-bg-494949 squareCraft-w-20 squareCraft-rounded-md squareCraft-py-1 squareCraft-input squareCraft-text-md squareCraft-px-2 " name="" id="">
                                </div>

                             </div>
                             <p class="squareCraft-w-full squareCraft-text-center squareCraft-mt-5 squareCraft-py-1px squareCraft-cursor-pointer squareCraft-rounded-md squareCraft-bg-EF7C2F squareCraft-text-color-white">Publish</p>
                             <!-- <div class="squareCraft-mt-2  squareCraft-grid squareCraft-grid-cols-12 squareCraft-justify-between squareCraft-gap-3">
                                 <div class="squareCraft-col-span-8 squareCraft-rounded-md squareCraft-h-9 squareCraft-justify-between squareCraft-flex squareCraft-items-center squareCraft-bg-3f3f3f squareCraft-border-585858 squareCraft-border  squareCraft-rounded">
                                     <input type="text" value="Sf Pro Sans" class="squareCraft-bg-transparent squareCraft-input squareCraft-h-9 squareCraft-text-md squareCraft-px-4" name="" id="">
                                     <div class="squareCraft-bg-[#525151] px-2 h-full">
                                         <svg class="squareCraft-cursor-pointer squareCraft-rotate-180 squareCraft-flex squareCraft-items-center squareCraft-justify-center squareCraft-h-full squareCraft-rounded" xmlns="http://www.w3.org/2000/svg" width="13" height="6" viewBox="0 0 13 6" fill="none">
                                             <path d="M11.5 5L6.5 1L1.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                         </svg>
                                     </div>
                                 </div>
                                 <div class="squareCraft-col-span-4 squareCraft-justify-between squareCraft-flex squareCraft-items-center squareCraft-bg-3f3f3f squareCraft-border-585858 squareCraft-border  squareCraft-rounded-md">
                                     <p class="squareCraft-text-center squareCraft-mx-auto"> 14</p>
                                     <div class="squareCraft-h-full w-[1px] bg-gray-500"></div>
                                     <p class="squareCraft-text-center mx-auto"> px</p>
                                     <div class="squareCraft-bg-[#525151] px-2 h-full">
                                         <svg class="squareCraft-cursor-pointer rotate-180 flex items-center justify-center h-full rounded" xmlns="http://www.w3.org/2000/svg" width="13" height="6" viewBox="0 0 13 6" fill="none">
                                             <path d="M11.5 5L6.5 1L1.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                         </svg>
                                     </div>
                                 </div>
                             </div> -->
     
     
     
     
     
                             <!-- <div class="squareCraft-mt-3 grid grid-cols-12 justify-between gap-3">
                                 <div class="squareCraft-col-span-7 justify-between flex items-center bg-[#3f3f3f] border-[#585858] border  rounded">
                                     <p class="squareCraft-py-1 px-3"> Regular</p>
                                     <div class="squareCraft-bg-[#525151] px-2 h-full">
                                         <svg class="squareCraft-cursor-pointer rotate-180 flex items-center justify-center h-full rounded" xmlns="http://www.w3.org/2000/svg" width="13" height="6" viewBox="0 0 13 6" fill="none">
                                             <path d="M11.5 5L6.5 1L1.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                         </svg>
                                     </div>
                                 </div>
                                 <div class="squareCraft-col-span-4 justify-between flex items-center bg-[#3f3f3f] border-[#585858] border  rounded">
                                     <div class="squareCraft-w-full">                               <div class="squareCraft-border w-3 h-3 border-gray-400 mx-auto"></div>
                                     </div>                                <div class="squareCraft-h-full w-[1px] bg-gray-500"></div>
                                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" class="squareCraft-w-full" viewBox="0 0 16 8" fill="none">
                                         <path d="M3.49535 7L0.5 4.00233L3.5 1" stroke="#F6F6F6" strokeLinecap="round" strokeLinejoin="round" />
                                         <path d="M12.5047 1L15.5 3.99771L12.5 7" stroke="#F6F6F6" strokeLinecap="round" strokeLinejoin="round" />
                                         <path d="M0.5 4H15.5" stroke="#F6F6F6" strokeLinecap="round" strokeLinejoin="round" />
                                     </svg>
                                     <div class="squareCraft-h-full w-[1px] bg-gray-500"></div>
                                     <svg xmlns="http://www.w3.org/2000/svg" class="squareCraft-w-full" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                         <mask id="path-1-inside-1_542_3166" fill="white">
                                             <path d="M7 0.5C10.5898 0.5 13.5 3.41023 13.5 7C13.5 10.5898 10.5898 13.5 7 13.5C3.41023 13.5 0.5 10.5898 0.5 7C0.5 3.41023 3.41023 0.5 7 0.5ZM1.38636 7C1.38636 8.48883 1.9778 9.91668 3.03056 10.9694C4.08332 12.0222 5.51117 12.6136 7 12.6136C8.48883 12.6136 9.91668 12.0222 10.9694 10.9694C12.0222 9.91668 12.6136 8.48883 12.6136 7C12.6136 5.51117 12.0222 4.08332 10.9694 3.03056C9.91668 1.9778 8.48883 1.38636 7 1.38636C5.51117 1.38636 4.08332 1.9778 3.03056 3.03056C1.9778 4.08332 1.38636 5.51117 1.38636 7ZM10.6932 7.44318H3.30682C3.18928 7.44318 3.07655 7.39649 2.99344 7.31338C2.91033 7.23026 2.86364 7.11754 2.86364 7C2.86364 6.88246 2.91033 6.76974 2.99344 6.68662C3.07655 6.60351 3.18928 6.55682 3.30682 6.55682H10.6932C10.8107 6.55682 10.9234 6.60351 11.0066 6.68662C11.0897 6.76974 11.1364 6.88246 11.1364 7C11.1364 7.11754 11.0897 7.23026 11.0066 7.31338C10.9234 7.39649 10.8107 7.44318 10.6932 7.44318Z" />
                                         </mask>
                                         <path d="M7 0.5C10.5898 0.5 13.5 3.41023 13.5 7C13.5 10.5898 10.5898 13.5 7 13.5C3.41023 13.5 0.5 10.5898 0.5 7C0.5 3.41023 3.41023 0.5 7 0.5ZM1.38636 7C1.38636 8.48883 1.9778 9.91668 3.03056 10.9694C4.08332 12.0222 5.51117 12.6136 7 12.6136C8.48883 12.6136 9.91668 12.0222 10.9694 10.9694C12.0222 9.91668 12.6136 8.48883 12.6136 7C12.6136 5.51117 12.0222 4.08332 10.9694 3.03056C9.91668 1.9778 8.48883 1.38636 7 1.38636C5.51117 1.38636 4.08332 1.9778 3.03056 3.03056C1.9778 4.08332 1.38636 5.51117 1.38636 7ZM10.6932 7.44318H3.30682C3.18928 7.44318 3.07655 7.39649 2.99344 7.31338C2.91033 7.23026 2.86364 7.11754 2.86364 7C2.86364 6.88246 2.91033 6.76974 2.99344 6.68662C3.07655 6.60351 3.18928 6.55682 3.30682 6.55682H10.6932C10.8107 6.55682 10.9234 6.60351 11.0066 6.68662C11.0897 6.76974 11.1364 6.88246 11.1364 7C11.1364 7.11754 11.0897 7.23026 11.0066 7.31338C10.9234 7.39649 10.8107 7.44318 10.6932 7.44318Z" fill="white" />
                                         <path d="M1.38636 7H0.386364H1.38636ZM7 12.6136V13.6136V12.6136ZM12.6136 7H13.6136H12.6136ZM7 1.38636V0.386364V1.38636ZM2.86364 7H1.86364H2.86364ZM7 1.5C10.0375 1.5 12.5 3.96251 12.5 7H14.5C14.5 2.85794 11.1421 -0.5 7 -0.5V1.5ZM12.5 7C12.5 10.0375 10.0375 12.5 7 12.5V14.5C11.1421 14.5 14.5 11.1421 14.5 7H12.5ZM7 12.5C3.96251 12.5 1.5 10.0375 1.5 7H-0.5C-0.5 11.1421 2.85794 14.5 7 14.5V12.5ZM1.5 7C1.5 3.96251 3.96251 1.5 7 1.5V-0.5C2.85794 -0.5 -0.5 2.85794 -0.5 7H1.5ZM0.386364 7C0.386364 8.75405 1.08316 10.4362 2.32345 11.6765L3.73767 10.2623C2.87244 9.39711 2.38636 8.22361 2.38636 7H0.386364ZM2.32345 11.6765C3.56375 12.9168 5.24595 13.6136 7 13.6136V11.6136C5.77639 11.6136 4.60289 11.1276 3.73767 10.2623L2.32345 11.6765ZM7 13.6136C8.75405 13.6136 10.4362 12.9168 11.6765 11.6765L10.2623 10.2623C9.39711 11.1276 8.22361 11.6136 7 11.6136V13.6136ZM11.6765 11.6765C12.9168 10.4362 13.6136 8.75405 13.6136 7H11.6136C11.6136 8.22361 11.1276 9.39711 10.2623 10.2623L11.6765 11.6765ZM13.6136 7C13.6136 5.24595 12.9168 3.56375 11.6765 2.32345L10.2623 3.73767C11.1276 4.60289 11.6136 5.77639 11.6136 7H13.6136ZM11.6765 2.32345C10.4362 1.08316 8.75405 0.386364 7 0.386364V2.38636C8.22361 2.38636 9.39711 2.87244 10.2623 3.73767L11.6765 2.32345ZM7 0.386364C5.24595 0.386364 3.56375 1.08316 2.32345 2.32345L3.73767 3.73767C4.60289 2.87244 5.77639 2.38636 7 2.38636V0.386364ZM2.32345 2.32345C1.08316 3.56375 0.386364 5.24595 0.386364 7H2.38636C2.38636 5.77639 2.87244 4.60289 3.73767 3.73767L2.32345 2.32345ZM10.6932 6.44318H3.30682V8.44318H10.6932V6.44318ZM3.30682 6.44318C3.4545 6.44318 3.59613 6.50185 3.70055 6.60627L2.28633 8.02048C2.55698 8.29113 2.92406 8.44318 3.30682 8.44318V6.44318ZM3.70055 6.60627C3.80497 6.71069 3.86364 6.85232 3.86364 7H1.86364C1.86364 7.38276 2.01569 7.74983 2.28633 8.02048L3.70055 6.60627ZM3.86364 7C3.86364 7.14768 3.80497 7.28931 3.70055 7.39373L2.28633 5.97952C2.01569 6.25017 1.86364 6.61724 1.86364 7H3.86364ZM3.70055 7.39373C3.59613 7.49815 3.4545 7.55682 3.30682 7.55682V5.55682C2.92406 5.55682 2.55698 5.70887 2.28633 5.97952L3.70055 7.39373ZM3.30682 7.55682H10.6932V5.55682H3.30682V7.55682ZM10.6932 7.55682C10.5455 7.55682 10.4039 7.49815 10.2995 7.39373L11.7137 5.97952C11.443 5.70887 11.0759 5.55682 10.6932 5.55682V7.55682ZM10.2995 7.39373C10.195 7.28931 10.1364 7.14768 10.1364 7H12.1364C12.1364 6.61725 11.9843 6.25017 11.7137 5.97952L10.2995 7.39373ZM10.1364 7C10.1364 6.85232 10.195 6.71069 10.2995 6.60627L11.7137 8.02048C11.9843 7.74983 12.1364 7.38275 12.1364 7H10.1364ZM10.2995 6.60627C10.4039 6.50185 10.5455 6.44318 10.6932 6.44318V8.44318C11.0759 8.44318 11.443 8.29113 11.7137 8.02048L10.2995 6.60627Z" fill="#F6F6F6" mask="url(#path-1-inside-1_542_3166)" />
                                     </svg>
     
                                 </div>
                                 <div>
     
                                 </div>
                             </div>
     
     
                             <div class="squareCraft-mt-3 grid grid-cols-12 h-8 justify-between gap-3">
     
                                 <div class="squareCraft-col-span-5 justify-between flex items-center bg-[#3f3f3f] border-[#585858] border  rounded">
                                     <div class="squareCraft-w-full">
                                         <svg class="squareCraft-mx-auto" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                             <path fillRule="evenodd" clipRule="evenodd" d="M1 0.25C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75H7C7.41421 1.75 7.75 1.41421 7.75 1C7.75 0.585786 7.41421 0.25 7 0.25H1ZM1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H13C13.4142 5.75 13.75 5.41421 13.75 5C13.75 4.58579 13.4142 4.25 13 4.25H1ZM0.25 9C0.25 8.58579 0.585786 8.25 1 8.25H7C7.41421 8.25 7.75 8.58579 7.75 9C7.75 9.41421 7.41421 9.75 7 9.75H1C0.585786 9.75 0.25 9.41421 0.25 9ZM1 12.25C0.585786 12.25 0.25 12.5858 0.25 13C0.25 13.4142 0.585786 13.75 1 13.75H13C13.4142 13.75 13.75 13.4142 13.75 13C13.75 12.5858 13.4142 12.25 13 12.25H1Z" fill="#F6F6F6" />
                                         </svg>
                                     </div>                                <div class="squareCraft-h-full w-[1px] bg-gray-500"></div>
                                     <div class="squareCraft-w-full">
                                         <svg class="squareCraft-mx-auto" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                             <path fillRule="evenodd" clipRule="evenodd" d="M4 0.25C3.58579 0.25 3.25 0.585786 3.25 1C3.25 1.41421 3.58579 1.75 4 1.75H10C10.4142 1.75 10.75 1.41421 10.75 1C10.75 0.585786 10.4142 0.25 10 0.25H4ZM1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H13C13.4142 5.75 13.75 5.41421 13.75 5C13.75 4.58579 13.4142 4.25 13 4.25H1ZM3.25 9C3.25 8.58579 3.58579 8.25 4 8.25H10C10.4142 8.25 10.75 8.58579 10.75 9C10.75 9.41421 10.4142 9.75 10 9.75H4C3.58579 9.75 3.25 9.41421 3.25 9ZM1 12.25C0.585786 12.25 0.25 12.5858 0.25 13C0.25 13.4142 0.585786 13.75 1 13.75H13C13.4142 13.75 13.75 13.4142 13.75 13C13.75 12.5858 13.4142 12.25 13 12.25H1Z" fill="#F6F6F6" />
                                         </svg>
                                     </div>
                                     <div class="squareCraft-h-full w-[1px] bg-gray-500"></div>
                                     <div class="squareCraft-w-full">
                                         <svg class="squareCraft-mx-auto" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                             <path fillRule="evenodd" class="squareCraft-mx-auto" clipRule="evenodd" d="M7 0.25C6.58579 0.25 6.25 0.585786 6.25 1C6.25 1.41421 6.58579 1.75 7 1.75H13C13.4142 1.75 13.75 1.41421 13.75 1C13.75 0.585786 13.4142 0.25 13 0.25H7ZM1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H13C13.4142 5.75 13.75 5.41421 13.75 5C13.75 4.58579 13.4142 4.25 13 4.25H1ZM6.25 9C6.25 8.58579 6.58579 8.25 7 8.25H13C13.4142 8.25 13.75 8.58579 13.75 9C13.75 9.41421 13.4142 9.75 13 9.75H7C6.58579 9.75 6.25 9.41421 6.25 9ZM1 12.25C0.585786 12.25 0.25 12.5858 0.25 13C0.25 13.4142 0.585786 13.75 1 13.75H13C13.4142 13.75 13.75 13.4142 13.75 13C13.75 12.5858 13.4142 12.25 13 12.25H1Z" fill="#F6F6F6" />
                                         </svg>
                                     </div>
                                     <div class="squareCraft-h-full w-[1px] bg-gray-500"></div>
     
                                     <div class="squareCraft-w-full">
                                         <svg class="squareCraft-mx-auto" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                             <path fillRule="evenodd" class="squareCraft-mx-auto" clipRule="evenodd" d="M1 0.25C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75H13C13.4142 1.75 13.75 1.41421 13.75 1C13.75 0.585786 13.4142 0.25 13 0.25H1ZM1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H13C13.4142 5.75 13.75 5.41421 13.75 5C13.75 4.58579 13.4142 4.25 13 4.25H1ZM0.25 9C0.25 8.58579 0.585786 8.25 1 8.25H13C13.4142 8.25 13.75 8.58579 13.75 9C13.75 9.41421 13.4142 9.75 13 9.75H1C0.585786 9.75 0.25 9.41421 0.25 9ZM1 12.25C0.585786 12.25 0.25 12.5858 0.25 13C0.25 13.4142 0.585786 13.75 1 13.75H7C7.41421 13.75 7.75 13.4142 7.75 13C7.75 12.5858 7.41421 12.25 7 12.25H1Z" fill="#F6F6F6" />
                                         </svg>
                                     </div>
     
                                 </div>
     
     
                                 <div class="squareCraft-col-span-3 justify-between flex items-center bg-[#3f3f3f] border-[#585858] border  rounded">
                                     <div class="squareCraft-w-full">
                                         <p class="squareCraft-text-center text-xs">3px</p>
                                     </div>                                <div class="squareCraft-h-full w-[1px] bg-gray-500"></div>
                                     <svg class="squareCraft-w-full" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                         <path d="M2.66132 1H11.3386" stroke="white" strokeLinecap="round" />
                                         <path d="M6.99994 1V7.85714" stroke="white" strokeLinecap="round" />
                                         <path d="M2.66135 9.57144L0.925903 11.2857M0.925903 11.2857L2.66135 13M0.925903 11.2857L13.074 11.2857M13.074 11.2857L11.3386 9.57144M13.074 11.2857L11.3386 13" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                     </svg>
     
     
                                 </div>
                                 <div class="squareCraft-col-span-3 justify-between flex items-center bg-[#3f3f3f] border-[#585858] border  rounded">
                                     <div class="squareCraft-w-full">
                                         <p class="squareCraft-text-center text-xs">Auto</p>                                </div>                                <div class="squareCraft-h-full w-[1px] bg-gray-500"></div>
                                     <svg class="squareCraft-w-full" xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                                         <path d="M1 11L3 13M3 13L5 11M3 13L3 1M3 1L1 3M3 1L5 3" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                         <path d="M9 2H17" stroke="white" strokeLinecap="round" />
                                         <path d="M9 7H17" stroke="white" strokeLinecap="round" />
                                         <path d="M9 12H17" stroke="white" strokeLinecap="round" />
                                     </svg>
     
     
                                 </div>
                                 <div>
     
                                 </div>
                             </div> -->
                         </div>
     
     
                     </div>
                 </div>
     
    </div>
    `;
  
    document.body.appendChild(widgetContainer);
  
    // Drag functionality for the widget
    let offset = { x: 0, y: 0 };
    widgetContainer.onmousedown = function (e) {
      const rect = widgetContainer.getBoundingClientRect();
      offset.x = e.clientX - rect.left;
      offset.y = e.clientY - rect.top;
  
      const onMouseMove = (event) => {
        widgetContainer.style.left = `${event.clientX - offset.x}px`;
        widgetContainer.style.top = `${event.clientY - offset.y}px`;
      };
  
      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
  
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };
  
    let selectedElement = null;
  
    // Add click event listener to the document
    document.addEventListener("click", (event) => {
      const target = event.target;
      let selectedElement = null;
    
      // Find the nearest parent div with an ID starting with "block-"
      let parent = target;
      while (parent && parent.tagName !== "HTML") {
          if (parent.id && parent.id.startsWith("block-")) {
              selectedElement = parent;
              console.log("✅ Selected block element:", selectedElement);
              console.log(`Selected block with ID: ${selectedElement.id}`);
              break;
          }
          parent = parent.parentElement;
      }
      let mainElement = target.closest("main"); // Find the closest <main> tag
    if (mainElement) {
        let articleElement = mainElement.querySelector("article[data-page-sections]"); // Find <article> inside <main>
        if (articleElement) {
            const pageSections = articleElement.getAttribute("data-page-sections");
            console.log("✅ Found article inside <main> with data-page-sections:", pageSections);
            console.log(`Found article inside <main> with data-page-sections: ${pageSections}`);
        } else {
            console.warn("⚠️ No <article> with data-page-sections inside <main> found.");
        }
    } else {
        console.warn("⚠️ No <main> tag found in the hierarchy.");
    }
     
  });
  
  
    // Apply font size change
    document.getElementById("apply-font-size").addEventListener("click", async () => {
      const fontSize = document.getElementById("font-size-input").value;
  
      if (!selectedElement) {
        alert("No element selected. Please click on an element first.");
        return;
      }
  
      if (!fontSize) {
        alert("Please enter a valid font size.");
        return;
      }
  
      // Apply the font size to the selected element
      selectedElement.style.fontSize = `${fontSize}px`;
  
      // Send the modification to the API
      const payload = {
        pageId: "alkfja234",
        modifications: {
          fontSize: `${fontSize}px`,
        },
        userId: "67962823ce065360d822548f",
      };
  
      try {
        const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          console.log("Font size updated successfully:", payload);
          alert("Font size updated successfully!");
        } else {
          console.error("Failed to update font size:", await response.text());
          alert("Failed to update font size.");
        }
      } catch (error) {
        console.error("Error while sending request:", error);
        alert("Error while sending request.");
      }
    });
  
    // Fetch existing modifications from the API
    async function fetchModifications() {
      try {
        const response = await fetch("https://webefo-backend.vercel.app/api/v1/modifications?pageId=alkfja234", {
          method: "GET",
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched modifications:", data);
  
          // Apply modifications to elements
          if (data.modifications && data.modifications.fontSize) {
            const elements = document.querySelectorAll("[id^='block-']");
            elements.forEach((element) => {
              element.style.fontSize = data.modifications.fontSize;
            });
            alert(`Applied font size: ${data.modifications.fontSize} to all elements.`);
          }
        } else {
          console.error("Failed to fetch modifications:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching modifications:", error);
      }
    }
  
    // Fetch modifications on load
    fetchModifications();
  })();
  