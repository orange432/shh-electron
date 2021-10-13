import React from 'react'
import {toast} from 'react-toastify';
import Card from '../components/Card';
import { Button } from '../components/Forms';
import { Tiny } from '../components/Typography';
import { useAuth } from '../contexts/AuthContext';

const Test = () => {

  const auth = useAuth();
  const toastMe = () => {
    toast.error("This is a toast!")
  }

  return (
    <div>
      <h1>This is a test page!</h1>
      <Button onClick={()=>toastMe()}>Toast</Button>
      <h2>My session token is: </h2>
      <Tiny>{auth.session}</Tiny>
      <Card caption="this is a test caption"/>
    </div>
  )
}

export default Test