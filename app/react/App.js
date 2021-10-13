import React from 'react'
import {  HashRouter as Router, Switch, Route } from 'react-router-dom'

import { Layout } from './components/Layout'

import Home from './pages/Home'
import Conversation from './pages/Conversation'
import Conversations from './pages/Conversations'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import Test from './pages/Test'
import NavBar from './components/NavBar'
import Logout from './pages/Logout'

const App = () => {
  return (
    <Router>
      <Layout>
      <NavBar/>
      <Switch>
        <Route exact path="/"><Home/></Route>
        <Route exact path="/test"><Test/></Route>
        <Route exact path="/conversations"><Conversations/></Route>
        <Route path="/conversations/:username"><Conversation/></Route>
        <Route exact path="/dashboard"><Dashboard/></Route>
        <Route exact path="/register"><Register/></Route>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/logout"><Logout/></Route>
      </Switch>
      </Layout>
    </Router>
  )
}

export default App
