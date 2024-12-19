// Öffnet das Modal
function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = "block"; // Zeigt das Modal an

    // Warte kurz, bevor du den Inhalt sichtbar machst (um den Fade-In zu ermöglichen)
    setTimeout(() => {
        modal.querySelector('.modal-content').style.opacity = '1'; // Setzt den Modal-Inhalt auf sichtbar
    }, 10);
}

// Schließt das Modal mit Animation
function closeModal() {
    const modal = document.getElementById('myModal');
    const modalContent = modal.querySelector('.modal-content');

    // Starte die Slide-Out Animation
    modalContent.style.animation = "slideOutContent 0.5s ease-out forwards";
    
    // Warte, bis die Animation abgeschlossen ist, und verstecke das Modal
    setTimeout(() => {
        modal.style.display = "none"; // Verstecke das Modal nach der Animation
    }, 500); // Nach 0.5s wird das Modal komplett versteckt
}

// Event Listener für den Button, um das Modal zu öffnen
document.getElementById("openModalBtn").addEventListener("click", openModal);
