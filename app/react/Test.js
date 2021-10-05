import React, { useEffect, useState } from 'react'
import { Title } from './components/Typography';

// const electron = window.require('electron');
// const { ipcRenderer } = electron;
const App = () => {
  const [message,setMessage] = useState('')

  useEffect(()=>{
    window.api.testReceive(msg=>setMessage(msg));
  },[message])

  const requestMessage = () => {
    window.api.message('React test 2!');
  }

  const awaitReply = () => {
    window.api.testSend("MSG1")
  }
  return (
    <div>
      <Title>Message</Title>
      <p>{(message)?message:'None.'}</p>
      <button onClick={()=>requestMessage()}>Message</button>
      <button onClick={()=>awaitReply()}>WAIT</button>
    </div>
  )
}

export default App
