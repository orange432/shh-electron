const { ipcRenderer, contextBridge } = require('electron');


contextBridge.exposeInMainWorld('api',{
  testInvoke: args => ipcRenderer.invoke('injoker',args),
  testSend: args => ipcRenderer.send('test-send',args),
  testReceive: callback => ipcRenderer.on('receiver',(event,args)=>callback(args)),
  message: message => ipcRenderer.send('message',message)
})