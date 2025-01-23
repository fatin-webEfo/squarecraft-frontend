// Create a basic widget template
const widget = document.createElement('div');
widget.style.position = 'fixed';
widget.style.top = '10px';
widget.style.right = '10px';
widget.style.width = '200px';
widget.style.height = '100px';
widget.style.backgroundColor = 'white';
widget.style.border = '1px solid #ccc';
widget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
widget.style.zIndex = '1000';
widget.style.display = 'none'; // Initially hidden

// Create a color picker
const colorPicker = document.createElement('input');
colorPicker.type = 'color';
colorPicker.value = '#ffffff'; // Default color
widget.appendChild(colorPicker);

// Create a save button
const saveButton = document.createElement('button');
saveButton.innerText = 'Save Changes';
widget.appendChild(saveButton);

// Append widget to body
document.body.appendChild(widget);

// Make the widget draggable
widget.onmousedown = function(event) {
    let shiftX = event.clientX - widget.getBoundingClientRect().left;
    let shiftY = event.clientY - widget.getBoundingClientRect().top;

    function moveAt(pageX, pageY) {
        widget.style.left = pageX - shiftX + 'px';
        widget.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    widget.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        widget.onmouseup = null;
    };
};

widget.ondragstart = function() {
    return false;
};

// Show widget on element click
document.addEventListener('click', (event) => {
    if (event.target.closest('.some-element')) { // Replace with your target element
        widget.style.display = 'block';
    }
});

// Save changes to localStorage
saveButton.addEventListener('click', () => {
    const bgColor = colorPicker.value;
    document.body.style.backgroundColor = bgColor; // Apply change
    localStorage.setItem('bgColor', bgColor); // Save to localStorage
    console.log(`Background color changed to: ${bgColor}`);
});

// Load saved changes on page load
window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('bgColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        colorPicker.value = savedColor; // Set color picker to saved color
    }
});
