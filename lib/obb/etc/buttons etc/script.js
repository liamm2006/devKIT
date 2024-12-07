// Beispiel für Dot Navigation (Aktivieren der Punkte)
const dots = document.querySelectorAll('.dot');

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active')); // Alle entfernen
        dot.classList.add('active'); // Nur den angeklickten aktivieren
    });
});
