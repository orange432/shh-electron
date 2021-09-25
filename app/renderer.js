const { ipcRenderer } = require('electron')

ipcRenderer.send('message','renderer test')

ipcMain.on('message',(event,args)=>{
  console.log(args)
})