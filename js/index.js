"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('electron'), app = _a.app, BrowserWindow = _a.BrowserWindow;
var path = require("path");
var electron_1 = require("electron");
var child;
var _b = new electron_1.MessageChannelMain(), port1 = _b.port1, port2 = _b.port2;
var createWindow = function () {
    var win = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: path.join(__dirname, '../js/preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    electron_1.ipcMain.handle('startListener', function () {
        child = electron_1.utilityProcess.fork(path.join(__dirname, '../ada/src/js/Ada.js'))
            .on("message", function (message) { return win.webContents.send(message.type, message); });
        child.postMessage({ message: 'listen' }, [port1]);
        win.webContents.send('draw', []);
    });
    electron_1.ipcMain.handle('record', function () {
        child.postMessage({ message: 'record' }, [port2]);
    });
    electron_1.ipcMain.handle('replay', function () {
        child.postMessage({ message: 'replay' }, [port2]);
    });
    win.maximize();
    win.show();
    win.loadFile('index.html');
};
app.whenReady().then(function () {
    createWindow();
});
