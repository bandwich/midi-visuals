var _a = require('electron'), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
contextBridge.exposeInMainWorld('ada', {
    startListener: function () { return ipcRenderer.invoke("startListener"); },
    record: function () { return ipcRenderer.invoke("record"); },
    replay: function () { return ipcRenderer.invoke("replay"); },
    ports: function (callback) { return ipcRenderer.on('ports', callback); },
    action: function (callback) { return ipcRenderer.on("action", callback); },
    set: function (callback) { return ipcRenderer.on('set', callback); },
    draw: function (callback) { return ipcRenderer.on('draw', callback); }
});
