import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client'
import { Global, ThemeProvider, css } from '@emotion/react';
import AuthProvider from './contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import apolloClient from './Apollo'
import theme from './Theme';
import App from './App';

const styles = css`
  body,html{
    color: #fff;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
`

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App/>
        <Global styles={styles}/>
        <ToastContainer/>
      </ThemeProvider>
    </AuthProvider>
  </ApolloProvider>
,document.getElementById('root'))