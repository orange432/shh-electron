import fs from 'fs';
import path from 'path'

export const fileLog = (log: any) => {
  let d = new Date();
  const filename = `LOG-${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}.log`
  fs.appendFileSync(path.resolve(__dirname,'../../logs/'+filename),log.toString());
  return true;
}

export const errorLog = async (error: any) => {
  try{
    let d = new Date();
    const filename = `ERROR-${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}.log`
    fs.appendFileSync(path.resolve(__dirname,'../../logs/'+filename),error.toString());
    return [true, null]
  }catch(err){
    console.log(err)
    return [null,"Error logger broke"]
  }
}