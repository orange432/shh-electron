import { createCipheriv,createDecipheriv, createHash, randomInt } from 'crypto';
import { generateKey, readKey, encrypt, createMessage, decryptKey,readPrivateKey, readMessage, decrypt } from 'openpgp'

/* Generates a sha256 hash
   @param (string) input - The string to hash
*/
export const sha256 = (input: string) => {
    return createHash('sha256').update(input).digest('base64');
}


export const encryptPassword = (salt: string,password: string): string => {
    return sha256(`${salt}${password}`)
}

/* Generates a random string
    @param (number) length - The length of the random string to be returned;
*/
export const randomString = (length: number): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    const charsLength = chars.length;
    let out='';
    for(let i=0;i<length;i++){
      out+=chars.charAt(randomInt(charsLength));
    }
    return out;
  }
/* Generates an OpenPGP keypair
    @param (string) username - username of the owner of the key
    @param (string) passphrase - passphrase used to store the key (default is the users salt)
*/

export const generateKeyPair = async (name: string, email: string, passphrase: string='') => {
    const {privateKey, publicKey} = await generateKey({
        curve: 'curve25519', 
        userIDs: [{name,email}],
        passphrase,
        format: 'armored'
    });
    return {publicKey, privateKey};
}


/* Encrypts text with an OpenPGP public key
    @param (string) text - the text to be encrypted
    @param (string) key - the PGP key to encrypt with
*/
export const encryptWithPGP = async (text: string, key: string) => {
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
export const decryptWithPGP = async (text: string,key: string, passphrase: string='') => {
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
export const encryptText = (text: string,key: string,iv: string) =>{
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
export const decryptText = (text: string,key: string,iv: string) => {
  key = key.substr(0,32);
  let decipher = createDecipheriv('aes-256-gcm',key,iv);
  let decryptedText = decipher.update(text,'base64','utf8');
  return decryptedText;
}

// /* Generates a session token based on the users id */
// export const generateSession = (user_id,started) => {
//     const key = "sQ5kS5G6n5teMMBLwLNUTyMyMT9npM2r";
//     const iv = "sT3MdbTLGELdSXbnFSQ8j7vPQd46EYgV";
//     const sessionString = `${user_id}__${started}__${randomString(16)}`;
//     const session = encryptText(sessionString,key,iv);
//     return session;
// }

// /* Decrypts the session token */
// export const decryptSession = (token) => {
//     const key = "sQ5kS5G6n5teMMBLwLNUTyMyMT9npM2r";
//     const iv = "sT3MdbTLGELdSXbnFSQ8j7vPQd46EYgV";
//     const decryptedSession = decryptText(token,key,iv);
//     const [user_id,started] = decryptedSession.split('__');
//     return {user_id,started};
// }
