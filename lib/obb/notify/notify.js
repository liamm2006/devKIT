function showNotification(message, type = 'info') {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = 'notification ' + type;
    notification.classList.add("show");
    
    setTimeout(() => {
        notification.classList.add("slide-out");
    }, 6000);
    
    setTimeout(() => {
        notification.classList.remove("show", "slide-out", type);
    }, 7000);
}