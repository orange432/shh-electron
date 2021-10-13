import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 72px;
  width: 100%;
  background: ${({theme}) => theme.colors.navbar};

  ul{
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    li{
      height: 100%;
      a{
        height: 100%;
        padding: 12px;
        color: #fff;
        text-decoration: none;
        display: block;
        &:hover{
          background: #fff;
          color: ${({theme})=> theme.colors.navbar};
        }
      }
    }
  }
`



const NavBar = () => {
  const auth = useAuth();
  if(auth.isLoggedIn){
    return (
      <Nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/conversations">Conversations</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </Nav>
    )
  }
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/test">Test Page</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {(auth.isLoggedIn)?<li>{auth.username}</li>:<></>}
      </ul>
    </Nav>
  )
}

export default NavBar
