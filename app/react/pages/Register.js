import React, {useState} from 'react'
import { useMutation, gql } from '@apollo/client'
import { toast } from 'react-toastify';
import { Title } from '../components/Typography'
import { Label, Input, Form, Button } from '../components/Forms'
import { Center } from '../components/Helpers';

const REGISTER_USER = gql`
  mutation CreateUser($username: String!, $password: String!){
    createUser(username: $username, password: $password){
      success
      error
    }
  }
`

const Register = () => {
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [createUser, {loading, error, data}] = useMutation(REGISTER_USER);

  const submitHandler = (e) => {
    e.preventDefault();
    if(confirmPassword!==password){
      return toast.error("Passwords do not match!")
    }
    if(!/[A-Za-z0-9_-]{4,32}$/.test(username)){
      return toast.error("Username must only contain: Letters, Numbers, - and _ and be between 4 and 32 characters")
    }
    createUser({variables: {username, password},onCompleted(data){
      toast.success("User created successfully!")
    }},)
    .catch(err=>{toast.error("Something went wrong!")})
  }

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <Title>Register</Title>
        <Label>Username</Label>
        <Input type="text" onChange={e=>setUsername(e.target.value)} value={username}/>
        <Label>Password</Label>
        <Input type="password" onChange={e=>setPassword(e.target.value)} value={password}/>
        <Label>Confirm Password</Label>
        <Input type="password" onChange={e=>setConfirmPassword(e.target.value)} value={confirmPassword}/>
        <Center>
          <Button type="submit">Submit</Button>
        </Center>
      </Form>
    </div>
  )
}

export default Register
