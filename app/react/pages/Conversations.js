import React, { useReducer } from 'react'
import { Button, Form, Input, Label } from '../components/Forms'
import { Center } from '../components/Helpers'
import { Subtitle, Title } from '../components/Typography'

const reducer = (state,action) => {
  switch(action.type){
    case "field":
      return {
        ...state,
        [action.field]: action.value
      }
    default:
      break;
  }
}

const initialState = {
  toUsername: '',
  messages: [],
  page: 0,
  perPage: 10,
  showBlockedUsers: false,
}

const Conversations = () => {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <div>
      <Title>Conversations</Title>
      <Form maxWidth="360px">
        <Subtitle>Start a conversation</Subtitle>
        <Label>Username</Label>
        <Input type="text" onChange={e=>dispatch({type: 'field', field: 'toUsername', value: e.target.value})} value={state.toUsername}/>
        <Center>
          <Button type="submit">Start</Button>
        </Center>
      </Form>
    </div>
  )
}

export default Conversations
