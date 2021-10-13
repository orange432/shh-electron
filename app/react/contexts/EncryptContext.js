import React, {useContext, createContext} from 'react'
import { gql, useLazyQuery} from '@apollo/client';
import { useAuth } from './AuthContext';

const AuthContext = createContext();

export const useEncrypt = () => (useContext(AuthContext))

const GET_PRIVATE_KEY = gql`
  query GetPrivateKey($session: String!){
    getPrivateKey(session: $session)
  }
`

const EncryptProvider = ({children}) => {
  const auth = useAuth();

  const [getPrivateKey,{loading,error, data}] = useLazyQuery(GET_PRIVATE_KEY)

  const loadPrivateKey = () => {
    getPrivateKey({variables: {session: auth.session}});
  }

  const ctxValues = {
    privateKey: data.getPrivateKey,
    loading,
    error,
    loadPrivateKey
  }
  return (
    <EncryptContext.Provider value={ctxValues}>
      {children}
    </EncryptContext.Provider>
  )
}

export default EncryptProvider
