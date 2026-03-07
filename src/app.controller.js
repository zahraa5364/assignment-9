
import express from "express"
import checkconnectionDB from "./DB/connectionDB.js"
import userRouter from "./modules/users/user.controller.js"
import cors from "cors"
import {PORT} from "../config/config.service.js"
const app = express()
const port = PORT


const bootstrap =() =>{

    app.use(cors({origin: ""}))
    app.use(express.json())

    app.get("/",(req,res,next)=>{
        res.status(200).json({message: `welcome on saraha app.....`})
    })

    checkconnectionDB()

    app.use("/uploads",express.static("uploads"))
    app.use("/users",userRouter)
    
    app.use("{/*demo}",(req,res,next)=>{
        throw new Error(`url ${req.originalUrl} not found`,{cause:404})
    })

    app.use((err,req,res,next)=>{ 
        console.log(err.stack)
        res.status(err.cause||500).json({message: err.message, stack: err.stack, error:  err})
    })

    app.listen(port, ()=>{
        console.log(`server is running on port ${port}`)
    })

}

export default bootstrap