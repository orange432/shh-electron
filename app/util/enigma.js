import { createCipheriv,createDecipheriv, createHash, randomInt } from 'crypto';
import { readKey, encrypt, createMessage, decryptKey,readPrivateKey, readMessage, decrypt } from 'openpgp'



/* Generates a random string
    @param (number) length - The length of the random string to be returned;
*/
export const randomString = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const charsLength = chars.length;
    let out='';
    for(let i=0;i<length;i++){
      out+=chars.charAt(randomInt(charsLength));
    }
    return out;
  }

/* Encrypts text with an OpenPGP public key
    @param (string) text - the text to be encrypted
    @param (string) key - the PGP key to encrypt with
*/
export const encryptWithPGP = async (text, key) => {
    const publicKey = await readKey({armoredKey: key});
    const encrypted = await encrypt({
        message: await createMessage({text}),
        encryptionKeys: publicKey
    });
    return encrypted;
}

/* Decrypts text with an OpenPGP public key
    @param (string) text - the text to be encrypted
    @param (string) key - the private PGP key to encrypt with
    @param (string) passphrase - the passphrase used for the private key
*/
export const decryptWithPGP = async (text,key, passphrase='') => {
    const privateKey = await decryptKey({
        privateKey: await readPrivateKey({armoredKey: key}),
        passphrase
    })
    const message = await readMessage({armoredMessage: text});
    const { data: decrypted, signatures} = await decrypt({
        message,
        decryptionKeys: privateKey
    });
    return decrypted;
}

/* Encrypts text with AES-256-GCM 
    @param (string) text - Text to be enrypted
    @param (string) key - 32 byte key
    @param (string) iv - Initialization Vector
*/
export const encryptText = (text,key,iv) =>{
  key = key.substr(0,32);
  let cipher = createCipheriv('aes-256-gcm',key,iv);
  let encryptedText = cipher.update(text,'utf8');
  encryptedText = Buffer.concat([encryptedText,cipher.final()]);
  return encryptedText.toString('base64');

}

/* Decrypts text with AES-256-GCM 
    @param (string) text - Text to be enrypted
    @param (string) key - 32 byte key
    @param (string) iv - Initialization Vector
*/
export const decryptText = (text,key,iv) => {
  key = key.substr(0,32);
  let decipher = createDecipheriv('aes-256-gcm',key,iv);
  let decryptedText = decipher.update(text,'base64','utf8');
  return decryptedText;
}

