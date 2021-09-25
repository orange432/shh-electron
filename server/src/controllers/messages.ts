import  prisma  from "../prisma"
import { encryptWithPGP } from "../util/enigma"
import { errorLog } from "../util/logger"

// Sends an already encrypted message
export const sendMessage = async (fromId: number, toId: number, content: string) => {
  try{
    let message = await prisma.message.create({
      data: {
        fromId,
        toId,
        content
      }
    })
    return [{message},null]
  }catch(err){
    errorLog(err)
    return [null,"Something went wrong with the database.  Please try again"]
  }
}

// Encrypts a plain text message with the toId user's public key and stores it on the database.
export const encryptAndSendMessage = async (fromId: number, toUsername: string, message: string) => {
  try{
    // Get the key
    let receiver = await prisma.user.findUnique({
      where: {username: toUsername},
      select: {publicKey: true, userId: true}
    })
    if(!receiver) return [null, "User does not exist."]
    let {publicKey, userId} = receiver;
    // Encrypt the message
    let content = await encryptWithPGP(message,publicKey);
    let result = await prisma.message.create({
      data: {
        fromId,
        toId: userId,
        content
      }
    })
    return [{message: result},null]
  }catch(err){
    errorLog(err)
    return [null,"Something went wrong with the database.  Please try again"]
  }
}