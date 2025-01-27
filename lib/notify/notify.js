class NotificationSystem {
    constructor() {
        this.container = document.querySelector('.notification-container');
        this.queue = [];
        this.setupEventListeners();
        this.animationID = null;
    }

    setupEventListeners() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                const messages = {
                    alert: 'Kritische Sicherheitswarnung!',
                    info: 'Neue Systeminformation verfügbar',
                    success: 'Erfolgreich gespeichert!',
                    warning: 'Netzwerkverbindung instabil',
                    ai: 'Neuronales Netz aktiviert'
                };
                this.show(messages[type], type);
            });
        });
    }

    show(message, type) {
        const notification = this.createNotification(message, type);
        this.queue.push(notification);
        if (this.queue.length === 1) this.animate();
    }

    createNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                ${this.getIcon(type)}
            </div>
            <div class="notification-content">${message}</div>
            <div class="progress-bar">
                <div class="progress"></div>
            </div>
        `;

        notification.addEventListener('click', () => this.dismiss(notification));
        return notification;
    }

    getIcon(type) {
        const icons = {
            alert: '<i class="fas fa-fire"></i>',
            info: '<i class="fas fa-info-circle"></i>',
            success: '<i class="fas fa-check-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>',
            ai: '<i class="fas fa-bolt"></i>'
        };
        return icons[type];
    }

    animate() {
        const notification = this.queue[0];
        this.container.appendChild(notification);
        
        // Start enter animation
        requestAnimationFrame(() => {
            notification.classList.add('active');
        });

        // Auto-dismiss
        const dismissTimer = setTimeout(() => {
            this.dismiss(notification);
        }, 5000);

        // Mouse interaction
        notification.addEventListener('mouseenter', () => {
            clearTimeout(dismissTimer);
        });

        notification.addEventListener('mouseleave', () => {
            if (!notification.classList.contains('exit')) {
                this.dismiss(notification, 5000 - (Date.now() - notification.timestamp));
            }
        });
    }

    dismiss(notification, delay = 500) {
        if (!notification) return;

        notification.classList.remove('active');
        notification.classList.add('exit');
        
        // Smooth removal
        setTimeout(() => {
            notification.remove();
            this.queue.shift();
            if (this.queue.length > 0) this.animate();
        }, delay);

        // Cancel pending animation frame
        cancelAnimationFrame(this.animationID);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new NotificationSystem();
});