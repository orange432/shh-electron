import React, {useEffect} from 'react'
import { useMutation, gql } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { toast } from 'react-toastify'
import { Title } from '../components/Typography'
import ErrorScreen from '../components/ErrorScreen'

const LOGOUT = gql`
  mutation Logout($session: String!){
    logout(session: $session){
      success
      error
    }
  }
`

const Logout = () => {
  const [logout,{loading,error,data: logoutData}] = useMutation(LOGOUT);
  const auth = useAuth();
  useEffect(()=>{
    logout({variables: {session: auth.session}})
    .then((data)=>{
      console.log(data);
      if(data.data.logout.success){
        auth.logout();
        toast.success('Logged out successfully!')
      }else{
        toast.error(data.data.logout.error);
      }
    })
    .catch(err=>console.log(err))
  },[])

  if(!auth.isLoggedIn) return (
    <div>
      <Title>Redirecting...</Title>
      <Redirect to="/"/>
    </div>
  )
  if(error) return <ErrorScreen error={error}/>
  if(loading) return <Title>Logging Out...</Title>
  if(logoutData?.logout?.success) return (
    <p>Logged out successfully.</p>
  )
  return (
    <div>
      <Title>Something went wrong, try <Link to="/logout">logging out</Link> again.</Title>
    </div>
  )
}

export default Logout
