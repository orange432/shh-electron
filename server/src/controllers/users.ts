import prisma from "../prisma"
import { encryptPassword, generateKeyPair, randomString } from "../util/enigma"
import { errorLog } from "../util/logger"

export const createUser = async (username: string, password: string)=> {
  if(!/[A-Za-z0-9_-]{4,32}$/.test(username)){
    return [null,"Username must only contain: Letters, Numbers, - and _ and be between 4 and 32 characters"]
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

    return [user, null]

  }catch(err){
    errorLog(err)
    return [null,"Something went wrong with the database.  Please try again"]
  }
}

// Resets a users password
export const resetPassword = async (userId: number, oldPassword: string, newPassword: string) =>{
  try{
    let user = await prisma.user.findUnique({where: {userId}})
    if(!user) return [null,"User does not exist."]
    if(encryptPassword(user.salt,oldPassword)!==user.password){
      return [null,"Incorrect password"]
    }
    // Old password is correct, change password
    await prisma.user.update({
      where: {userId},
      data: {
        password: encryptPassword(user.salt,newPassword)
      }
    })
    return [true,null];
  }catch(err){
    errorLog(err);
    return [null,"Something went wrong with the database.  Please try again"]
  }
}

// Disables the given account permanently.
export const disableAccount = (userId: number) => {

}