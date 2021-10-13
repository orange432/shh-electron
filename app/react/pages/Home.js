import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import { CenterFlex } from '../components/Helpers'
import { Title } from '../components/Typography'

const Home = () => {
  return (
    <div>
      <Title>Shh - The Quiet Chat App</Title>
      <CenterFlex>
        <Card to="/login" caption="Login" imageSrc="speech-bubbles.svg"/>
        <Card to="/register" caption="Register" imageSrc="question-mark.svg"/>
      </CenterFlex>
    </div>
  )
}

export default Home
