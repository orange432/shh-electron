import React from 'react'
import {toast} from 'react-toastify';
import { Button } from '../components/Forms';

const Test = () => {

  const toastMe = () => {
    toast.error("This is a toast!")
  }

  return (
    <div>
      <h1>This is a test page!</h1>
      <Button onClick={()=>toastMe()}>Toast</Button>
    </div>
  )
}

export default Test