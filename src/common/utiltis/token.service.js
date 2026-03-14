import jwt from "jsonwebtoken"

export const GenerateToken = ({ payload, secret_key, options = {} } = {}) => {
    if (!secret_key) throw new Error("JWT secret key is missing!")
    return jwt.sign(payload, secret_key, options)
}

export const VerifyToken = ({ token, secret_key, options = {} } = {}) => {
    if (!secret_key) throw new Error("JWT secret key is missing!")
    return jwt.verify(token, secret_key, options)
}