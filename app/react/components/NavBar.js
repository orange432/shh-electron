import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 72px;
  width: 100%;
  background: ${({theme}) => theme.colors.oceanBlue};

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
          color: ${({theme})=> theme.colors.oceanBlue};
        }
      }
    }
  }
`



const NavBar = () => {
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
      </ul>
    </Nav>
  )
}

export default NavBar
