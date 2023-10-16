const { app, BrowserWindow } = require('electron')
import path = require('path')
import { ipcMain, MessageChannelMain, UtilityProcess, utilityProcess } from "electron";

let child: UtilityProcess;
const { port1, port2 } = new MessageChannelMain()

declare global {
	interface Window {
		ada: any;
  	}
}

const createWindow = () => {
    const win = new BrowserWindow({
		show: false,
		webPreferences: {
			preload: path.join(__dirname, '../js/preload.js'),
			contextIsolation: true,
			nodeIntegration: false
		} 
	})

	ipcMain.handle('startListener', () => {
		child = utilityProcess.fork(path.join(__dirname, '../ada/src/js/Ada.js'))
			.on("message", (message) => win.webContents.send(message.type, message))
		child.postMessage({message: 'listen'}, [port1])
		win.webContents.send('draw', [])
	})

	ipcMain.handle('record', () => {
		child.postMessage({message: 'record'}, [port2])
	})

	ipcMain.handle('replay', () => {
		child.postMessage({message: 'replay'}, [port2])
	})

	win.maximize()
	win.show()
	win.loadFile('index.html')
}

app.whenReady().then(() => {
	createWindow()
})