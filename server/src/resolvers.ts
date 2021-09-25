import { getPublicKey } from "./controllers/keys";
import { decryptWithPGP, encryptWithPGP, generateKeyPair, randomString } from "./util/enigma"
import { errorLog } from "./util/logger";

const resolvers = {
  Query: {
    getMessages: async (_: any, args:{session: string, username: string, startFrom: number}) => {

    },
    authenticate: async (_: any, args:{session: string})=> {

    },
    getPublicKey: async (_: any, args: {username: string}) => {
      let [publicKey,err] = await getPublicKey(args.username);
      if(err) return {success: false, error: err}
      return {success: true, payload: publicKey};
    }
  },
  Mutation: {
    createUser: async (_: any, args: {username: string, password: string}) => {

    },
    login: async (_: any, args: {username: string, password: string})=>{

    },
    logout: async (_: any, args: {session: string})=>{

    },
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
    },
    blockUser: async (_:any, args: {session: string, username: string}) => {

    }
  }
}

export default resolvers