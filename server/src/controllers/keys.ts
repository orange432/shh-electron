import prisma from "../prisma"
import { errorLog } from "../util/logger"

// Gets a users public key
export const getPublicKey = async (username: string) => {
  try{
    let user = await prisma.user.findUnique(
    {where: 
        { username }
    ,select: {publicKey: true}})
    if(!user) return [null, "User does not exist"]
    let {publicKey} = user;
    return [publicKey, null]
  }catch(err){
    errorLog(err)
    return [null,"Something went wrong with the database.  Please try again"]
  }
}

export const getPrivateKey = async (userId: number) => {
  try{
    let user = await prisma.user.findUnique(
    {where: 
        { userId }
    ,select: {privateKey: true}})
    if(!user) return [null, "User does not exist"]
    let {privateKey} = user;
    if(!privateKey) return [null, "Private key has already been exported to a device."]
    return [privateKey, null]
  }catch(err){
    errorLog(err)
    return [null,"Something went wrong with the database.  Please try again"]
  }
}

export const exportPrivateKey = async (userId: number) => {
  try{
    let user = await prisma.user.findUnique({
      where: { userId },
      select: {privateKey: true}
    })
    if(!user) return [null, "User does not exist"]
    let {privateKey} = user;
    if(!privateKey) return [null, "Private key has already been exported to a device."]
    if(process.env.END_TO_END === "true"){
      await prisma.user.update({
        where: {userId},
        data: {privateKey: null} // to keep or not to keep
      })
    }    
    return [privateKey, null]
  }catch(err){
    errorLog(err)
    return [null,"Something went wrong with the database.  Please try again"]
  }
}
