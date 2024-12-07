function showNotification(message, type = 'info') {
    const notification = document.getElementById("notification");
    let icon = '';
    switch(type) {
        case 'alert':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle"></i>';
            break;
        case 'check':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
    }
    notification.innerHTML = icon + message;
    notification.className = 'notification ' + type;
    notification.classList.add("show");
    
    setTimeout(() => {
        notification.classList.add("slide-out");
    }, 6000);
    
    setTimeout(() => {
        notification.classList.remove("show", "slide-out", type);
    }, 7000);
}