import React from 'react'
import {  HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Layout } from './components/Layout'

import Home from './pages/Home'
import Conversation from './pages/Conversation'
import Register from './pages/Register'
import Login from './pages/Login'
import Test from './pages/Test'
import NavBar from './components/NavBar'

const App = () => {
  return (
    <Router>
      <Layout>
      <NavBar/>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/test"><Test/></Route>
        <Route path="/conversation/:username"><Conversation/></Route>
        <Route exact path="/register"><Register/></Route>
        <Route exact path="/login"><Login/></Route>
      </Switch>
      </Layout>
    </Router>
  )
}

export default App
