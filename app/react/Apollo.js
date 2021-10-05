import { ApolloClient, InMemoryCache } from '@apollo/client'
import { APOLLO_URI } from './config'

const apolloClient = new ApolloClient({
  uri: APOLLO_URI,
  cache: new InMemoryCache()
})

export default apolloClient