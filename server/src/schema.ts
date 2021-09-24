import {gql} from 'apollo-server-express';

const schema = gql`
type KeyPair{
  privateKey: String!
  publicKey: String!
}
type Query{
  test: Boolean!
  
}
type Mutation{

  encryptWithPublicKey(publicKey: String!, input: String): String
  generateKeyPair(name: String, email: String, passphrase: String): KeyPair
}
`

export default schema;