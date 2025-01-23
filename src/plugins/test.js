const observer = new MutationObserver(() => {
    // Verify the admin bar by inspecting the class
    const headerActions = document.querySelector('.header-actions'); // Make sure this class is correct
    
    if (headerActions && !document.getElementById('squarecraft-icon')) {
        // Create the plugin icon
        let pluginIcon = document.createElement('img');
        pluginIcon.id = 'squarecraft-icon';
        pluginIcon.src = 'https://webefo.com/wp-content/uploads/2023/09/cropped-Webefo-Favicon.png'; // Your plugin icon
        pluginIcon.style.width = '30px'; // Size of the icon
        pluginIcon.style.marginRight = '10px'; // Optional margin between the icon and other elements
        pluginIcon.style.cursor = 'pointer'; // Optional: adds a pointer cursor when hovering over the icon

        // Optional: You can add a click event if needed to open your plugin's functionality
        pluginIcon.addEventListener('click', () => {
            console.log("Plugin icon clicked");
            // Logic for opening plugin settings or any interaction
        });

        // Append the icon to the admin header
        headerActions.appendChild(pluginIcon);
    }
});

// Observe changes in the DOM to account for dynamically injected elements
observer.observe(document.body, { childList: true, subtree: true });
