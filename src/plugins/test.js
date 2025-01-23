const observer = new MutationObserver(() => {
    let header = document.querySelector('.header-actions');
    if (header && !document.getElementById('squarecraft-icon')) {
        let pluginIcon = document.createElement("img");
        pluginIcon.id = "squarecraft-icon";
        pluginIcon.src = "https://webefo.com/wp-content/uploads/2023/09/cropped-Webefo-Favicon.png";
        pluginIcon.style.width = "30px";
        header.appendChild(pluginIcon);
    }
});

observer.observe(document.body, { childList: true, subtree: true });
