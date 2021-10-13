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

  const logout = () => {
    setSession('')
    setIsLoggedIn(false);
    setIsAuthorized(false);
    setUsername('');
  }

  const ctxValues = {
    isAuthorized,
    setIsAuthorized,
    session,
    storeLogin,
    isLoggedIn,
    username,
    logout
  }
  return (
    <AuthContext.Provider value={ctxValues}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
