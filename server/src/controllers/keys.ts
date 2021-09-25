import prisma from "../prisma"
import { errorLog } from "../util/logger"

export const getPublicKey = async (username: string) => {
  try{
    let publicKey = await prisma.user.findUnique(
    {where: 
        { username }
    ,select: {publicKey: true}})
    return [publicKey, null]
  }catch(err){
    errorLog(err)
    return [null,"Something went wrong with the database.  Please try again"]
  }
}