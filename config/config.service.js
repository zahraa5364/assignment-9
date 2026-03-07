import dotenv from "dotenv"
import { resolve } from "node:path"

const NODE_ENV = process.env.NODE_ENV

let envPaths = {
    development: ".env.development",
    production: ".env.production"
}

dotenv.config({path:resolve(`config/${envPaths[NODE_ENV]}`)})

export const PORT = +process.env.port
export const salt_rounds = +process.env.salt_rounds
export const DB_URI = process.env.DB_URI
export const secret_key = process.env.secret_key
