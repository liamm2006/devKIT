let fileInput = document.getElementById('fileInput');
let progressBar = document.getElementById('progressBar');
let progressContainer = document.getElementById('progressContainer');
let fileInfo = document.getElementById('fileInfo');
let dragArea = document.getElementById('dragArea');

// Trigger Datei-Upload bei Drag & Drop
dragArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragArea.style.backgroundColor = '#e0f7e0'; // Highlight beim Überfahren
});

dragArea.addEventListener('dragleave', () => {
    dragArea.style.backgroundColor = '#f9f9f9'; // Zurücksetzen der Farbe
});

dragArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dragArea.style.backgroundColor = '#f9f9f9'; // Zurücksetzen der Farbe
    const file = e.dataTransfer.files[0]; // Nimm die erste Datei

    if (file) {
        handleFileUpload(file);
    }
});

// Datei auswählen über Input-Element
function handleFileUpload(file = null) {
    if (!file) {
        const files = fileInput.files;
        file = files[0]; // Nimm die erste Datei aus dem Input-Element
    }

    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2); // Dateigröße in MB
    const fileType = file.type;

    // Zeige Dateiname und Dateigröße
    fileInfo.innerHTML = `
        <p><strong>Dateiname:</strong> ${fileName}</p>
        <p><strong>Größe:</strong> ${fileSize} MB</p>
        <p><strong>Typ:</strong> ${fileType}</p>
    `;

    // Wenn es ein Bild ist, zeige ein Vorschaubild
    if (fileType.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = document.createElement("img");
            imgElement.src = e.target.result;
            fileInfo.appendChild(imgElement);
        };
        reader.readAsDataURL(file);
    }

    // Fortschrittsbalken anzeigen
    progressContainer.style.display = 'block';

    // Start der Upload-Animation
    startUploadAnimation([file]);
}

function startUploadAnimation(files) {
    const total = files.length;
    let uploaded = 0;

    const interval = setInterval(() => {
        if (uploaded >= total) {
            clearInterval(interval);
            alert('Dateien erfolgreich hochgeladen!');
            progressContainer.style.display = 'none';
        } else {
            uploaded++;
            progressBar.style.width = (uploaded / total) * 100 + '%';
        }
    }, 500); // Simuliert eine Upload-Geschwindigkeit

    // Zeige während des Uploads eine Animation mit dem Text "Wird hochgeladen..."
    const uploadingText = document.createElement("div");
    uploadingText.classList.add("uploading");
    uploadingText.textContent = 'Wird hochgeladen...';
    fileInfo.appendChild(uploadingText);
}
