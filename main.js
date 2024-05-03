import {app, BrowserWindow} from 'electron';

function createWindow() {
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      },
      autoHideMenuBar: true
    });
  
    mainWindow.loadURL(`http://localhost:${3000}`);
}

app.whenReady().then(createWindow);