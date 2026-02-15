import { providerEnum } from "../../common/enum/user.enum.js"
import {successResponse} from "../../common/utiltis/response.success.js"
import * as db_service from "../../DB/db.service.js"
import userModel from "../../DB/models/user.model.js"
import {encrypt,decrypt} from "../../common/utiltis/security/encrypt.security.js"
import {compare,hash} from "../../common/utiltis/security/hash.security.js"
import jwt from "jsonwebtoken"
import {v4 as uuidv4} from "uuid"
import {VerifyToken,GenerateToken} from "../../common/utiltis/token.service.js"
import { sendEmail } from "../../common/utiltis/email.service.js";
import { encryptRSA } from "../../common/utiltis/asymmetric.security.js";

export const signUp = async (req,res,next)=> {
    const {userName,email,password,phone,gender} = req.body
    if(
        await db_service.findOne({
            model: userModel,
            filter:{email}
        })
    ){
        throw new Error("email already exist")
    }
    const user = await db_service.create({
        model: userModel, 
        data:{
            userName,
            email,
            password:hash({plainText:password}),
            gender,
            phone:encrypt(phone)}
    })

    const otp = Math.floor(100000 + Math.random() * 900000)
    const encryptedOtp = encryptRSA(String(otp));

    await sendEmail({
        to: email,
        subject: "Your OTP for Saraha",
        text: `Your OTP (encrypted): ${encryptedOtp}`
    })

    successResponse({res,status:201,data:user})
}

export const signIn = async (req,res,next)=> {
    const {email,password} = req.body
    const user = await db_service.findOne({
        model: userModel,
        filter: {email,provider: providerEnum.system}
    })
    if(!user){
        throw new Error("user not exist")
    }
    
    if(!compare({plainText:password , cipherText: user.password})){
        throw new Error("invalid password",{cause: 400})
    } 

    const access_token = GenerateToken({
        payload:{id:user._id, email:user.email},
        secret_key: "ahmed",
        options: {expiresIn:60*3,
        // issuer: "http://localhost:300",
        // audience: "http://localhost:4000", 
        // jwtid: uuidv4()
        }
    })

    successResponse({res,data: {access_token}})
}


export const getProfile = async (req,res,next)=> {
    successResponse({res,message: "done" , data: req.user })
}

