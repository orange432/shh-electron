import React from 'react'
import styled from '@emotion/styled'


const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
`

const Question = styled.h4`
  padding-left: 20px;
  margin: 15px 0 5px;
`

const Answer = styled.p`
  text-align: justify;
`


const FAQ = () => {
  return (
    <Container>
      <Question>How do I send a message?</Question>
      <Answer>Firstly, you must open up the 'Conversations' window then either enter a username and click 'Start Conversation' or click on an existing conversation with a user.</Answer>
    </Container>
  )
}

export default FAQ
