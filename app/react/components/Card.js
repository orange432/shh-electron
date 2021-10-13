import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const Container = styled.div`
  border: 1px solid ${({theme})=>theme.colors.secondary};
  width: 300px;
  height: 200px;
  border-radius: 4px;
  transition: all 0.25s;
  padding: 10px;
  margin: 5px;
  &:hover{
    background: rgba(255,255,255,0.1);
  }

  a{
    text-decoration: none;
    color: #fff;
  }
`

const Image = styled.img`
  display: block;
  margin: 0 auto;
  border-radius: 3px;
  width: 150px;
  height: 150px;
`

const Caption = styled.h4`
  color: ${({theme})=>theme.colors.tertiary};
  margin-top: 10px;
  font-weight: 400;
  font-size: 18px;
  text-align: center;
`



const Card = (props) => {
  return (
    <Container>
      <Link to={props.to}>
        <Image src={(props.imageSrc)?`images/${props.imageSrc}`:'images/lamp.svg'} alt=""/>
        <Caption>{props.caption}</Caption>
      </Link>
    </Container>
  )
}

export default Card
