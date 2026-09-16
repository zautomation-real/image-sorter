//Importar Electron
const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");

//Constructor de rutas de archivos
const path = require("path");

//File System Module
const fs = require("fs");

//Definir cómo crear una ventana
function createWindow () {
    const window = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });

    window.loadFile("index.html");
}

//Escoger carpeta
ipcMain.handle("choose-folder", async function () {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    });

    if (!result.canceled) {
        return result.filePaths[0];
    }

    return null;
});

//Leer carpeta
ipcMain.handle("get-images", function (event, folderPath) {
    const files = fs.readdirSync(folderPath);

    //Formatos de imagen
    const mediaExtensions = [
        // Standard images
        ".jpg", ".jpeg", ".png", ".webp",
        ".tif", ".tiff", ".heic", ".heif",

        // RAW photos
        ".dng", ".cr2", ".cr3", ".nef", ".nrw",
        ".arw", ".raf", ".orf", ".ori", ".rw2",
        ".rwl", ".pef", ".3fr", ".fff", ".iiq", ".srw",

        // Common / professional camera video
        ".mp4",
        ".mov",
        ".m4v",
        ".mts",
        ".m2ts",
        ".mxf",
        ".avi",
        ".mpg",
        ".mpeg",
        ".webm",
        ".mkv",

        // Less common / legacy camera video
        ".mod",
        ".tod",
        ".3gp",
        ".3g2",
        ".vob"
    ];

    //Filtrador de imágenes
    const images = files.filter(function (file) {
        const extension = path.extname(file).toLowerCase();

        return mediaExtensions.includes(extension);
    });

    const imagePaths = images.map(function (image) {
        return path.join(folderPath, image);
    });

    return imagePaths;
});

//Copiar archivos entre carpetas
ipcMain.handle("move-image", function (event, imagePath, destinationPath) {
    const fileName = path.basename(imagePath);
    const newPath = path.join(destinationPath, fileName);

    fs.copyFileSync(imagePath, newPath);

    return newPath;
});

//Deshacer movimiento
ipcMain.handle("undo-move", function (event, copiedPath) {
    fs.unlinkSync(copiedPath);
});

//Abrir carpetas
ipcMain.handle("open-folder", function (event, folderPath) {
    shell.openPath(folderPath);
});

//Esperar a Electron para actuar
app.whenReady().then(createWindow);

