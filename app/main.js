const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname,'preload.js')
    }
  });

  mainWindow.loadFile('index.html')
}

app.whenReady().then(()=>{
  createWindow();

  app.on('activate',()=>{
    if (BrowserWindow.getAllWindows().length===0) createWindow()
  })

  app.on('window-all-closed',()=>{
    if (process.platform !== 'darwin') app.quit()
  })
})

// IPC

ipcMain.on('message',(event,args)=>{
  console.log(args)
})