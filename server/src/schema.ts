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
  decryptWithPrivateKey(privateKey: String!, input: String, passphrase: String): String
  encryptWithPublicKey(publicKey: String!, input: String): String
  generateKeyPair(name: String, email: String, passphrase: String): KeyPair
}
`

export default schema;