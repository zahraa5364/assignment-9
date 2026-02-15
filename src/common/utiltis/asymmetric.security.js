import crypto from 'crypto';


export const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

export const encryptRSA = (text) => {
    return crypto.publicEncrypt(publicKey, Buffer.from(text)).toString('base64');
}

export const decryptRSA = (cipherText) => {
    return crypto.privateDecrypt(privateKey, Buffer.from(cipherText, 'base64')).toString();
}
