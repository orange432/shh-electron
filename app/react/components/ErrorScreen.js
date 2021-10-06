import React from 'react'
import { Center } from './Helpers'
import { Title } from './Typography'

const ErrorScreen = ({error}) => {
  return (
    <div>
      <Title>Error!</Title>
      <Center>
        {error.toString()}
      </Center>
    </div>
  )
}

export default ErrorScreen
