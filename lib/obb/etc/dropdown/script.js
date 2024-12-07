// script.js
function toggleDropdown(event) {
    const dropdownContent = document.getElementById("myDropdown");
    dropdownContent.classList.toggle("show");
    
    // Füge die Klick-Animation hinzu
    const button = event.currentTarget; // Der geklickte Button
    button.classList.add('button-clicked');
 
    // Entferne die Klasse nach einer kurzen Zeit
    setTimeout(() => {
        button.classList.remove('button-clicked');
    }, 150); // Zeit in Millisekunden
 }
 
 // Schließt das Dropdown, wenn außerhalb geklickt wird
 window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
 }