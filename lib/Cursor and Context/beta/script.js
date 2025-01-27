const cursor = document.querySelector('.custom-cursor');
const contextMenu = document.getElementById('contextMenu');
let currentContext = null;

// Dynamic menu configurations
const menuConfig = {
    text: {
        title: 'Text Actions',
        items: [
            { icon: 'copy', label: 'Copy', action: 'copy' },
            { icon: 'paste', label: 'Paste', action: 'paste' },
            { icon: 'bold', label: 'Bold', action: 'formatBold' },
            { icon: 'italic', label: 'Italic', action: 'formatItalic' }
        ]
    },
    media: {
        title: 'Media Actions',
        items: [
            { icon: 'download', label: 'Download', action: 'download' },
            { icon: 'share', label: 'Share', action: 'share' },
            { icon: 'info-circle', label: 'Info', action: 'showInfo' }
        ]
    },
    button: {
        title: 'Button Actions',
        items: [
            { icon: 'mouse-pointer', label: 'Click', action: 'simulateClick' },
            { icon: 'code', label: 'Inspect', action: 'inspectElement' }
        ]
    },
    disabled: {
        title: 'Disabled Controls',
        items: [
            { icon: 'unlock', label: 'Enable', action: 'enableControl' },
            { icon: 'trash', label: 'Remove', action: 'removeElement' }
        ]
    }
};

// Cursor logic
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Hover effects for different elements
document.querySelectorAll('.hover-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('text-mode');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('text-mode');
    });
});

document.querySelectorAll('.modern-btn:not(.disabled)').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('pointer-mode');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('pointer-mode');
    });
});

document.querySelectorAll('.modern-btn.disabled').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('blocked-mode');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('blocked-mode');
    });
});

// Context menu logic
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const target = e.target.closest('[data-context]');
    const contextType = target ? target.dataset.context : 'default';
    
    updateMenu(contextType);
    positionMenu(e.clientX, e.clientY);
    showMenu();
});

document.addEventListener('click', () => {
    hideMenu();
});

function updateMenu(contextType) {
    const config = menuConfig[contextType] || {
        title: 'General Actions',
        items: [
            { icon: 'redo', label: 'Refresh', action: 'refresh' },
            { icon: 'cog', label: 'Settings', action: 'openSettings' }
        ]
    };

    const menuItemsHTML = config.items.map(item => `
        <div class="menu-item" data-action="${item.action}">
            <i class="fas fa-${item.icon}"></i>
            <span>${item.label}</span>
        </div>
    `).join('');

    contextMenu.innerHTML = `
        <div class="menu-header">
            <span class="menu-title">${config.title}</span>
        </div>
        <div class="menu-items">
            ${menuItemsHTML}
        </div>
    `;

    contextMenu.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', handleMenuAction);
    });
}

function positionMenu(x, y) {
    const menuWidth = contextMenu.offsetWidth;
    const menuHeight = contextMenu.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const finalX = x + menuWidth > windowWidth ? windowWidth - menuWidth - 10 : x;
    const finalY = y + menuHeight > windowHeight ? windowHeight - menuHeight - 10 : y;

    contextMenu.style.left = `${finalX}px`;
    contextMenu.style.top = `${finalY}px`;
}

function showMenu() {
    contextMenu.classList.add('visible');
}

function hideMenu() {
    contextMenu.classList.remove('visible');
}

function handleMenuAction(e) {
    const action = e.currentTarget.dataset.action;
    e.preventDefault();
    
    e.currentTarget.style.transform = 'scale(0.95)';
    setTimeout(() => {
        e.currentTarget.style.transform = '';
        hideMenu();
    }, 150);

    switch(action) {
        case 'copy':
            handleCopy();
            break;
        case 'paste':
            handlePaste();
            break;
        case 'download':
            alert('Downloading media...');
            break;
        default:
            console.log('Action:', action);
    }
}

async function handleCopy() {
    try {
        const selection = window.getSelection().toString();
        await navigator.clipboard.writeText(selection);
        showFeedback('Copied to clipboard!');
    } catch (err) {
        showFeedback('Failed to copy!');
    }
}

async function handlePaste() {
    try {
        const text = await navigator.clipboard.readText();
        showFeedback(`Pasted: ${text.slice(0, 20)}...`);
    } catch (err) {
        showFeedback('Failed to paste!');
    }
}

function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}