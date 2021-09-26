const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    backgroundColor: "#001e05",
    title: "Shh Messenger",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
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
  console.log(args);
  event.reply('This is a reply!')
})

ipcMain.on('test-send',(event,args)=>{
  console.log(args);
  event.sender.send('receiver','Message received');
})