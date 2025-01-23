const observer = new MutationObserver(() => {
    // Find the parent <ul> container where you want to insert the icon
    const container = document.querySelector('.css-1tn5iw9');
    
    // Check if the container exists and the icon has not been added yet
    if (container && !document.getElementById('squarecraft-icon')) {
      // Create the icon element
      let pluginIcon = document.createElement('img');
      pluginIcon.id = 'squarecraft-icon';
      pluginIcon.src = 'https://webefo.com/wp-content/uploads/2023/09/cropped-Webefo-Favicon.png';
      pluginIcon.style.width = '30px';  // Adjust the size as needed
      pluginIcon.style.marginRight = '10px';  // Optional: Adds spacing between the icon and other items
      
      // Insert the icon at the beginning of the <ul>
      container.insertBefore(pluginIcon, container.firstChild);
    }
  });
  
  // Observe for changes in the DOM
  observer.observe(document.body, { childList: true, subtree: true });
  