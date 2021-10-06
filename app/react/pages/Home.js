import React from 'react'
import { Link } from 'react-router-dom'
import { Title } from '../components/Typography'

const Home = () => {
  return (
    <div>
      <Title>Shh - The Quiet Chat App</Title>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/test">Test Page</Link>
    </div>
  )
}

export default Home
