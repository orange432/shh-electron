import React, {useState, useContext, createContext} from 'react'

const AuthContext = createContext();

export const useAuth = () => (useContext(AuthContext))

const AuthProvider = ({children}) => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [session, setSession] = useState('');
  const [username, setUsername] = useState('');

  const storeLogin = (token, username) => {
    setSession(token);
    setIsLoggedIn(true);
    setUsername(username);
  }

  const ctxValues = {
    isAuthorized,
    setIsAuthorized,
    session,
    storeLogin,
    isLoggedIn,
    username,
  }
  return (
    <AuthContext.Provider value={ctxValues}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
