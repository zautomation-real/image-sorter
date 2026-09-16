//Conectores con index.html
const folderChooser = document.getElementById("folderChooser");
const imagePreview = document.getElementById("imagePreview");
const destinationsContainer = document.getElementById("destinations");
const sourceFolder = document.getElementById("sourceFolder");
const remainingCount = document.getElementById("remainingCount");
const openFolder = document.getElementById("openFolder");
const imageName = document.getElementById("imageName");
const zoomIndicator = document.getElementById("zoomIndicator");
const videoPreview = document.getElementById("videoPreview");

//Variables
let currentIndex = 0;
let images = [];
let destinations = [];
let moveHistory = [];
let sourceFolderPath = null;
let zoom = 1;
let panX = 0;
let panY = 0;
let isDragging = false;
let lastMouseX = 0;
let lastMouseY = 0;

//Para video
const videoExtensions = [
    ".mp4", ".mov", ".m4v", ".webm",
    ".mkv", ".mts", ".m2ts", ".mxf",
    ".avi", ".mpg", ".mpeg",
    ".mod", ".tod", ".3gp", ".3g2", ".vob"
];

//Para reconocer los videos
function isVideo(filePath) {
    const extension = "." + filePath.split(".").pop().toLowerCase();

    return videoExtensions.includes(extension);
}

//Para los 9 destinos
for (let i = 0; i < 9; i++) {
    const destinationRow = document.createElement("div");
    destinationRow.className = "destinationRow";

    const button = document.createElement("button");
    button.textContent = `Choose destination ${i + 1}`;

    const openButton = document.createElement("button");
    openButton.textContent = "Open";

    destinationRow.appendChild(button);
    destinationRow.appendChild(openButton);

    destinationsContainer.appendChild(destinationRow);

    button.addEventListener("click", async function () {
        destinations[i] = await window.electronAPI.chooseFolder();
        
        if (!destinations[i]) {
            return;
        }
        
        const folderName = destinations[i].split("\\").pop();
        button.textContent = `${i + 1} - ${folderName}`;
    });

    openButton.addEventListener("click", function () {
        if (destinations[i]) {
            window.electronAPI.openFolder(destinations[i]);
        }
    });
}

//Explorador de archivos
function showCurrentImage() {
    if (images.length === 0) {
        remainingCount.textContent = "0 photos"
        imagePreview.src = "";
        imageName.textContent = "";
        return;
    }

    remainingCount.textContent = `${currentIndex + 1} of ${images.length}`;

    zoom = 1;
    panX = 0;
    panY = 0;

    isDragging = false;
    lastMouseX = 0;
    lastMouseY = 0;

    applyZoom();


    const currentFile = images[currentIndex];

    if (isVideo(currentFile)) {
        imagePreview.style.display = "none";

        videoPreview.style.display = "block";
        videoPreview.src = currentFile;
        videoPreview.load();

    } else {
        videoPreview.pause();
        videoPreview.removeAttribute("src");
        videoPreview.load();
        videoPreview.style.display = "none";

        imagePreview.style.display = "block";
        imagePreview.src = currentFile;
    }
    const fileName = images[currentIndex].split("\\").pop();
    imageName.textContent = fileName;
}

videoPreview.addEventListener("error", function () {
    console.log("VIDEO ERROR:", videoPreview.error);
});

//Zoom + posición
function applyZoom() {
    imagePreview.style.transform =
        `translate(${panX}px, ${panY}px) scale(${zoom})`;

    zoomIndicator.textContent = `X${zoom.toFixed(1)}`;
}

//Listener de la rueda
imagePreview.addEventListener("wheel", function (event) {
    event.preventDefault();

    const previousZoom = zoom;

    if (event.deltaY < 0) {
        zoom += 0.1;
    } else {
        zoom -= 0.1;
    }

    if (zoom < 1) {
        zoom = 1;
    }

    if (zoom > 5) {
        zoom = 5;
    }

    if (zoom < previousZoom) {
        const ratio = (zoom - 1) / (previousZoom - 1);

        panX *= ratio;
        panY *= ratio;
    }

    if (zoom <= 1) {
        zoom = 1;
        panX = 0;
        panY = 0;
    }

    applyZoom();
});

//Listener del puntero activo
imagePreview.addEventListener("pointerdown", function (event) {
    if (zoom <= 1) {
        return;
    }

    isDragging = true;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

    imagePreview.setPointerCapture(event.pointerId);
});

//Listener de movimiento de la imagen con zoom
imagePreview.addEventListener("pointermove", function (event) {
    if (!isDragging) {
        return;
    }

    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;

    panX += deltaX;
    panY += deltaY;

    lastMouseX = event.clientX;
    lastMouseY = event.clientY;

    applyZoom();
});

//Listener de soltar puntero
imagePreview.addEventListener("pointerup", function (event) {
    isDragging = false;
    imagePreview.releasePointerCapture(event.pointerId);
});

imagePreview.addEventListener("pointercancel", function () {
    isDragging = false;
});

//Listener de botón Origen
folderChooser.addEventListener("click", async function () {
    sourceFolderPath = await window.electronAPI.chooseFolder();

    if (sourceFolderPath) {
        images = await window.electronAPI.getImages(sourceFolderPath);

        const folderName = sourceFolderPath.split("\\").pop();
        sourceFolder.textContent = `${folderName}:`;

        currentIndex = 0;
        showCurrentImage();
    }
});

//Listener del teclado
document.addEventListener("keydown", async function(event) {
    
    //Mover a la siguente imagen
    if (event.key === "ArrowRight") {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            
            showCurrentImage();
        }
    }

    //Mover a la imagen anterior
    if (event.key === "ArrowLeft") {
        if (currentIndex > 0) {
            currentIndex--;
            
            showCurrentImage();
        }
    }
    
    //Ctrl+Z
    if (event.ctrlKey && event.key.toLowerCase() === "z") {
        if (moveHistory.length > 0) {
            const lastMove = moveHistory.pop();
            await window.electronAPI.undoMove(lastMove.to);

            images.splice(lastMove.index, 0, lastMove.from);
            currentIndex = lastMove.index;

            showCurrentImage();
        }
    }

    //Seleccionar carpetas de destino
    if (event.key >= 1 && event.key <= 9) {
        const destinationIndex = Number(event.key) - 1;
        if (destinations[destinationIndex] && images.length > 0) {
            
            const imagePath = images[currentIndex];
            const newPath = await window.electronAPI.moveImage(
                imagePath,
                destinations[destinationIndex]
            );

            moveHistory.push({
                from: imagePath,
                to: newPath,
                index: currentIndex
            });

            images.splice(currentIndex, 1);

            if (currentIndex >= images.length && currentIndex > 0) {
                currentIndex--;
            }

            showCurrentImage();
        }
    }

    //Esc = Zoom reset
    if (event.key === "Escape") {
        zoom = 1;
        panX = 0;
        panY = 0;
        applyZoom();
    }
});

//Abrir carpeta
openFolder.addEventListener("click", function () {
    if (sourceFolderPath) {
        window.electronAPI.openFolder(sourceFolderPath);
    }
});