const { contextBridge, ipcRenderer } = require("electron");

//Puente main.js <> renderer.js
contextBridge.exposeInMainWorld("electronAPI", {
    chooseFolder: () => ipcRenderer.invoke("choose-folder"),
    getImages: (folderPath) => ipcRenderer.invoke("get-images", folderPath),
    moveImage: (imagePath, destinationPath) => ipcRenderer.invoke(
        "move-image", imagePath, destinationPath
    ),
    undoMove: (copiedPath) => ipcRenderer.invoke("undo-move", copiedPath),
    openFolder: (folderPath) => ipcRenderer.invoke("open-folder", folderPath)
});