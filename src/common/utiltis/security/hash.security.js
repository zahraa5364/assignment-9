import { hashSync,compareSync } from "bcrypt"

export const hash = ({plain_text , salt_rounds = process.env.salt_rounds}={}) =>{
    return hashSync(plain_text,Number(salt_rounds))
}

export const compare = ({plainText,cipherText}={}) =>{
    return compareSync(plainText,cipherText)
}