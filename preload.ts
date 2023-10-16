const { contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('ada', {
    startListener: () => ipcRenderer.invoke("startListener"),
    record: () => ipcRenderer.invoke("record"),
    replay: () => ipcRenderer.invoke("replay"),
    ports: (callback) => ipcRenderer.on('ports', callback),
    action: (callback) => ipcRenderer.on("action", callback),
    set: (callback) => ipcRenderer.on('set', callback),
    draw: (callback) => ipcRenderer.on('draw', callback)
})