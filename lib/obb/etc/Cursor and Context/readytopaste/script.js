const cursor = document.querySelector('.custom-cursor');
const contextMenu = document.getElementById('contextMenu');
const hoverTextElements = document.querySelectorAll('.hover-text');
const pointerTextElements = document.querySelectorAll('.pointer-button');
const blockedTextElements = document.querySelectorAll('.blocked-button');
let selectedText = '';
let clipboard = '';

// Update cursor position without transition (no lag)
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Hover effect for text
hoverTextElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('text-mode');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('text-mode');
    });
});

// Pointer effect for Buttons
pointerTextElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('pointer-mode');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('pointer-mode');
    });
});

// Blocked Pointer effect for Buttons
blockedTextElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('blocked-mode');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('blocked-mode');
    });
});

// Handle context menu right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    selectedText = window.getSelection().toString();

    // Position the menu where the right-click occurred
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.style.top = `${e.clientY}px`;

    // Show/hide the copy/paste options based on selected text
    if (selectedText) {
        document.getElementById('copyText').style.display = 'block';
        document.getElementById('pasteText').style.display = 'none';
    } else {
        document.getElementById('copyText').style.display = 'none';
        document.getElementById('pasteText').style.display = 'block';
    }

    contextMenu.style.display = 'block';
});

// Hide context menu on click
document.addEventListener('click', () => {
    contextMenu.style.display = 'none';
});

// Handle copy action using the Clipboard API
document.getElementById('copyText').addEventListener('click', () => {
    if (navigator.clipboard) {
        // Using Clipboard API to copy the text
        navigator.clipboard.writeText(selectedText)
            .then(() => {
                clipboard = selectedText;
                console.log('Copied:', clipboard);
                alert('Text copied to clipboard: ' + clipboard);
            })
            .catch(err => {
                console.error('Error copying text: ', err);
            });
    } else {
        // Fallback for older browsers without Clipboard API
        clipboard = selectedText;
        console.log('Copied:', clipboard);
        alert('Text copied to clipboard (fallback): ' + clipboard);
    }
});

// Handle paste action using the Clipboard API
document.getElementById('pasteText').addEventListener('click', () => {
    if (navigator.clipboard) {
        // Using Clipboard API to read from clipboard
        navigator.clipboard.readText()
            .then(text => {
                clipboard = text;
                console.log('Pasted:', clipboard);
                alert('Pasted from clipboard: ' + clipboard);
            })
            .catch(err => {
                console.error('Error reading clipboard: ', err);
            });
    } else {
        // Fallback for older browsers without Clipboard API
        alert('Clipboard API is not supported.');
    }
});

// Handle Open action
document.getElementById('openAction').addEventListener('click', () => {
    alert('Open action triggered');
});

// Handle Save action
document.getElementById('saveAction').addEventListener('click', () => {
    alert('Save action triggered');
});

// Handle Print action
document.getElementById('printAction').addEventListener('click', () => {
    alert('Print action triggered');
});

// Handle Settings action
document.getElementById('settingsAction').addEventListener('click', () => {
    alert('Settings action triggered');
});

// Handle Exit action
document.getElementById('exitAction').addEventListener('click', () => {
    alert('Exiting...');
    window.close();
});

document.getElementById("contextMenu");

// Kontextmenü öffnen
document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    
    contextMenu.style.top = `${e.clientY}px`;
    contextMenu.style.left = `${e.clientX}px`;
    contextMenu.classList.add("show");
});

// Kontextmenü schließen bei Klick außerhalb
document.addEventListener("click", () => {
    contextMenu.classList.remove("show");
});

// Zoom-out-Effekt beim Klicken auf einen Menüpunkt
const menuItems = document.querySelectorAll(".context-menu a");

menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        
        // Animation und Verzögerung
        item.style.transform = "scale(0.9)";
        setTimeout(() => {
            item.style.transform = "scale(1)";
            contextMenu.classList.remove("show");
        }, 150);
    });
});
