import prisma from "../prisma"
import { encryptPassword, generateKeyPair, randomString } from "../util/enigma"
import { errorLog } from "../util/logger"

export const createUser = async (username: string, password: string)=> {
  if(!/[A-Za-z0-9_-]$/.test(username)){
    return [null,"Username must only contain: Letters, Numbers, - and _"]
  }
  // Check input lengths
  if(username.length<4 || password.length<4){
    return [null,"Username and password must be more than 3 characters long."]
  }
  try{
    // Check if username in use.
    let inUse = await prisma.user.findUnique({where: {username}})
    if(inUse) return [null, "Username already in use."]

    // Create salt and hash password
    const salt = randomString(32);
    const hashedPassword = encryptPassword(salt,password);
    
    // Generate key pair
    let pubKey = '', privKey = '';
    try{
      let {publicKey,privateKey} = await generateKeyPair(username,`${username}@shh-chat.io`,salt);
      pubKey = publicKey;
      privKey = privateKey;
    }catch(err){
      return [null, "Something went wrong while generating your PGP keys, please try again."]
    }

    // Save user to database
    let user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        salt,
        publicKey: pubKey,
        privateKey: privKey
      }
    })

    return [{user}, null]

  }catch(err){
    errorLog(err)
    return [null,"Something went wrong with the database.  Please try again"]
  }
}