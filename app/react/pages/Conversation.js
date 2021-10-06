// All messages received by specific user
import React from 'react'
import { useQuery, gql } from '@apollo/client'

const GET_MESSAGES = gql`
  query GetMessages($username: String){
    getMessages(username: $username){
      success
      error
      messages{
        content
        from
        timestamp
      }
    }
  }
`


const Conversation = () => {
  return (
    <div>
      
    </div>
  )
}

export default Conversation
