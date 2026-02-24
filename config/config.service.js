import dotenv from "dotenv"
import { resolve } from "node:path"
dotenv.config({path:resolve("config/.env.development")})

export const PORT = +process.env.port
export const salt_rounds = +process.env.salt_rounds
export const DB_URI = process.env.DB_URI
export const secret_key = process.env.secret_key
