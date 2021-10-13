import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext'
import ErrorScreen from '../components/ErrorScreen'
import LoadingScreen from '../components/LoadingScreen'
import Card from '../components/Card'
import { CenterFlex } from '../components/Helpers'
import { Redirect } from 'react-router'

const AUTHENTICATE = gql`
  query Authenticate($session: String!){
    authenticate(session: $session){
      success
      error
      expiry
    }
  }
`

const Dashboard = () => {

  const auth = useAuth()

  const {loading, error, data: authData} = useQuery(AUTHENTICATE,
    {variables: {session: auth.session},
    onCompleted({data}){
      
    }
  })

  if(error) return <ErrorScreen error={error}/>
  if(loading) return <LoadingScreen/>

  if(authData.authenticate.success){
    return (
      <div>
        <CenterFlex>
          <Card to="/conversations" caption="Conversations" imageSrc="speech-bubbles.svg"/>
          <Card to="/faq" caption="FAQ" imageSrc="question-mark.svg"/>
        </CenterFlex>
        <CenterFlex>
          <Card to="/settings" caption="Settings" imageSrc="settings.svg"/>
          <Card to="/logout" caption="Logout" imageSrc="exit.svg"/>
        </CenterFlex>
      </div>
    )
  }else{
    return (
      <Redirect to="/login"/>
    )
  }
  
}

export default Dashboard
