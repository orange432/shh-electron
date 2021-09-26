import prisma from "../prisma";
import Redis from "../redis";
import { encryptPassword, randomString } from "../util/enigma";
import { errorLog } from "../util/logger";
const EXPIRY_MINUTES = +process.env.SESSION_EXPIRY_MINUTES! || 15
const SESSION_EXPIRY = EXPIRY_MINUTES*60

// Creates a session on the redis database
// Session tokens are currently randomly generated strings.
export const createSession = async (userId: number) => {
  // Generate unique session id
  let unique = false;
  let token = '';
  try{
    while (!unique){
      token = randomString(128);
      let session = await Redis.get(`sess:${token}`);
      if(!session) unique = true;
    }
  }catch(err){
    errorLog(err)
    return [null, "Error generating session, please try logging in again."]
  }
  // Store session to redis
  let started = new Date();
  Redis.set(`sess:${token}`,JSON.stringify({userId, started: started.getTime()}),'EX',SESSION_EXPIRY)

  // Store session record to permanent database
  try{
    await prisma.sessionRecord.create({
      data: {
        userId,
        started,
        ended: new Date(started.getTime()+SESSION_EXPIRY*1000)
      }
    })
    return [token,null]
  }catch(err){
    errorLog(err)
    return [null,"Error storing session into records, try refreshing the page."]
  }
}

export const authenticate = async (sessionToken: string) => {
  try{
    // Get session
    let session = await Redis.get(`sess:${sessionToken}`);
    if(!session) return [null, "Session expired.  Please log in"]
    // Add time to expiry
    Redis.set(`sess:${sessionToken}`,session,'EX',SESSION_EXPIRY)
    let {userId} = JSON.parse(session);
    // Get user data
    let user = await prisma.user.findUnique({where: {userId}});
    if(!user) return [null, 'User no longer exists.']
    user.salt = '';
    user.password = '';
    user.privateKey = '';
    return [{user, expiry: Date.now()+SESSION_EXPIRY*1000},null]
  }catch(err){
    errorLog(err)
    return [null, "Database error.  Please try again."]
  }
}

// Logs a user in and starts a session
export const login = async (username: string, password: string) => {
  try{
    let user = await prisma.user.findUnique({where: {username}})
    if(!user) return [null, 'User no longer exists.']
    // Check password
    if(encryptPassword(user.salt,password)!==user.password){
      return [null, "Incorrect password."]
    }
    let [session,sessionError] = await createSession(user.userId);
    if (sessionError) return [null, sessionError]
    return [session,null]
  }catch(err){
    errorLog(err)
    return [null, "Database error.  Please try again."]
  }
}

// Logs user out and stops a session
export const logout = async (sessionToken: string) => {
  // Get session (for session record)
  let session = await Redis.get(`sess:${sessionToken}`);
  if(!session) return [true, null];
  let {userId, started} = JSON.parse(session);
  // Store logout time on session record
  let startDate = new Date(started);
  let endDate = new Date();
  try{
    // Update session record times
    await prisma.sessionRecord.update({
      where: {userId_started: {userId, started: startDate}},
      data: {ended: endDate}
    })
    // Delete from redis
    Redis.del(`sess:${sessionToken}`)
    return [true, null];
  }catch(err){
    errorLog(err)
    return [null, "Database error.  Please try again."]
  }
  
}