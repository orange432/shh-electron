import {gql} from 'apollo-server-express';

const schema = gql`
type User{
  username
  avatar
  publicKey
  joined
}

type Auth{
  success: Boolean!
  error: String
  user: User
  expiry: Int
}

type KeyPair{
  privateKey: String!
  publicKey: String!
}

type Message{
  from: String
  content: String
  timestamp: Int
}

type MessageResponse{
  succcess: Boolean!
  error: String
  messages: [Message!]!
}

type Success{
  success: Boolean!
  payload: String
  error: String
}
type Query{
  getPublicKey(session: String!, username: String!): String
  testQuery: Success!
  getPrivateKey(session: String!): String
  getMessages(session: String!, startFrom: Int, numMessages: Int): MessageResponse!
  authenticate(session: String!): Auth!
}
type Mutation{

  encryptWithPublicKey(publicKey: String!, input: String): String
  generateKeyPair(name: String, email: String, passphrase: String): KeyPair
}
`

export default schema;