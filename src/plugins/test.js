const observer = new MutationObserver(() => {
    // Verify the admin bar by inspecting the class
    const headerActions = document.querySelector('.header-actions');  // Adjust this selector based on your findings
    
    if (headerActions && !document.getElementById('squarecraft-icon')) {
        // Create the plugin icon
        let pluginIcon = document.createElement('img');
        pluginIcon.id = 'squarecraft-icon';
        pluginIcon.src = 'https://webefo.com/wp-content/uploads/2023/09/cropped-Webefo-Favicon.png'; // Your plugin icon
        pluginIcon.style.width = '30px'; // Size of the icon
        pluginIcon.style.marginRight = '10px'; // Optional margin between the icon and other elements
        
        // Append the icon to the admin header
        headerActions.appendChild(pluginIcon);
    }
});

// Observe changes in the DOM
observer.observe(document.body, { childList: true, subtree: true });
