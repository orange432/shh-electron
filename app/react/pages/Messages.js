import React,{ useState, useEffect} from 'react'
import { useQuery, gql } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext';
import { Redirect } from 'react-router';
import { Message } from '../components/Message';
import { toast } from 'react-toastify';

const GET_MESSAGES = gql`
  query GetMessages($session: String!){
    getMessages(session: $session, startFrom: 0, numMessages: 99999){
      success
      error
      total
      messages{
        messageId
        from
        content
        timestamp
      }
    }
  }
`

const Messages = () => {
  const [messages,setMessages] = useState([]);
  
  const auth = useAuth();

  const [getMessages, {loading, error, data}] = useQuery(GET_MESSAGES,{
    variables: {session: auth.session}
  })
  .catch(err=>toast.error("Something went wrong with your connection!"))


  if(error) return <ErrorScreen error={error}/>
  if(loading) return <LoadingScreen/>

  if(!auth.isLoggedIn) return <Redirect to="/login" />

  return (
    <div>
      {data.getMessages.map((message,index)=>(
        <Message key={message.messageId}>
          <em>{message.username}</em>
          <p id={`msg-${index}`}>{message?.decryptedMessage || message.content}</p>
        </Message>
      ))}
    </div>
  )
}

export default Messages
