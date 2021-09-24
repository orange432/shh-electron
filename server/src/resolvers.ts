import { decryptWithPGP, encryptWithPGP, generateKeyPair, randomString } from "./util/enigma"
import { errorLog } from "./util/logger";

const resolvers = {
  Query: {
    test: ()=>(true),
    
    // Decrypts a message that used your public key
    
  },
  Mutation: {
    generateKeyPair: async (_: any, args: {email: string,passphrase: string, name: string}) => {
      // Too simple for a controller
      if(!args.email){
        args.email = `${randomString(8)}@${randomString(5)}.com`
      }
      if(!args.name){
        args.name = randomString(16)
      }
      if(!args.passphrase){
        args.passphrase='';
      }
      try{
        let result = await generateKeyPair(args.name,args.email,args.passphrase);
        return result;
      }catch(err){
        console.log(err);
        errorLog(err);
        return {privateKey: "", publicKey: ""};
      }
    },
    encryptWithPublicKey: async(_:any, args: {publicKey: string, input: string}) => {
      try{
        let result = await encryptWithPGP(args.input,args.publicKey);
        return result;
      }catch(err){
        errorLog(err);
        return "";
      }
    }
  }
}

export default resolvers