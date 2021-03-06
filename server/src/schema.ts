import {gql} from 'apollo-server-express';

const schema = gql`
type User{
  username: String!
  avatar: String
  publicKey: String
  joined: Float
}

type Login{
  success: Boolean!
  token: String
  error: String
}

type Auth{
  success: Boolean!
  error: String
  user: User
  expiry: Float
}

type KeyPair{
  privateKey: String!
  publicKey: String!
}

type Message{
  messageId: Int
  from: String
  content: String
  timestamp: Float
}

type MessageResponse{
  success: Boolean!
  error: String
  messages: [Message!]!
  total: Int
}

type Success{
  success: Boolean!
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
  createUser(username: String!, password: String!): Success!
  encryptWithPublicKey(publicKey: String!, input: String): String
  generateKeyPair(name: String, email: String, passphrase: String): KeyPair
  login(username: String!, password: String!): Login!
  logout(session: String!): Success!
}
`

export default schema;