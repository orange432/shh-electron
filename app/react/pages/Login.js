import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { toast } from 'react-toastify'
import { Button, Form, Input, Label } from '../components/Forms'
import { Center } from '../components/Helpers'
import LoadingScreen from '../components/LoadingScreen'
import ErrorScreen from '../components/ErrorScreen'
import { Title } from '../components/Typography'

const USER_LOGIN = gql`
  mutation Login($username: String!, $password: String!){
    login(username: $username, password: $password){
      success
      session
      error
    }
  }
`

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, {loading, error}] = useMutation(USER_LOGIN);

  const loginHandler = (e) => {
    e.preventDefault();
    if(username==='' || password===''){
      return toast.error('Please enter a username and password')
    }
    login({variables: {username, password}})
    .then(({data})=>{
      if(data.login.success){
        return toast.success(`User ${username} logged in!`)
      }
      toast.error(data.login.error)
    })
    .catch(err=>{toast.error("Something went wrong!")})
  }

  if (error) return <ErrorScreen error={error}/>
  if(loading) return <LoadingScreen/>

  return (
    <div>
      <Form onSubmit={loginHandler} maxWidth="360px">
        <Title>Login</Title>
        <Label>Username</Label>
        <Input type="text" onChange={e=>setUsername(e.target.value)} value={username}/>
        <Label>Password</Label>
        <Input type="password" onChange={e=>setPassword(e.target.value)} value={password}/>
        <Center>
          <Button type="submit">Login</Button>
        </Center>
      </Form>
    </div>
  )
}

export default Login
