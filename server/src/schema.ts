import {gql} from 'apollo-server-express';

const schema = gql`
type KeyPair{
  privateKey: String!
  publicKey: String!
}

type Success{
  success: Boolean!
  payload: String
  error: String
}
type Query{
  getPublicKey(session: String!, username: String!): String
  testQuery: Success!
}
type Mutation{

  encryptWithPublicKey(publicKey: String!, input: String): String
  generateKeyPair(name: String, email: String, passphrase: String): KeyPair
}
`

export default schema;