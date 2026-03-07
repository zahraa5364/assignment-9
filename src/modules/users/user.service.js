import { providerEnum } from "../../common/enum/user.enum.js"
import {successResponse} from "../../common/utiltis/response.success.js"
import * as db_service from "../../DB/db.service.js"
import userModel from "../../DB/models/user.model.js"
import {encrypt,decrypt} from "../../common/utiltis/security/encrypt.security.js"
import {compare,hash} from "../../common/utiltis/security/hash.security.js"
import {VerifyToken,GenerateToken} from "../../common/utiltis/token.service.js"
import {OAuth2Client} from 'google-auth-library'
import {salt_rounds,secret_key} from "../../../config/config.service.js"
import cloudinary from "../../common/utiltis/cloudinary.js"




export const signUp = async (req, res, next) => {
    const { userName, email, password, cPassword, gender, phone } = req.body

    if (password !== cPassword) {
        throw new Error("inValid password", { cause: 400 });
    }

    if (await db_service.findOne({ model: userModel, filter: { email } })) {
        throw new Error("email already exist", { cause: 409 });
    }

    const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder: "sarahaApp",
        // public_id: "ahmed"
        // use_filename: true
        // unique_filename: false 
        // resource_type:"image"
    })

    // let arr_paths =[]
    // for (const file of req.files){
    //     arr_paths.push(file.path)
    // }

    const user = await db_service.create({
        model: userModel,
        data: {
            userName,
            email,
            password: hash({ plain_text: password, salt_rounds: salt_rounds }),
            gender,
            phone: encrypt(phone),
            profilePicture: {secure_url,public_id}
            // coverPictures: arr_paths
        }
    })

    successResponse({ res, status: 201, message: "success signup", data: user })
}


export const signupWithGmail = async (req,res,next)=> {
    const { idToken } = req.body

    const client = new OAuth2Client();
    const ticket = await client.verifyIdToken({
        idToken,
        audience: "1018473995710-dr1je7i7uqd9edtj9inoa2v2bprv2hsh.apps.googleusercontent.com",  
        
    });
    const payload = ticket.getPayload();
    console.log(payload)
    const {email,email_verified,name,picture } = payload
    let user = await db_service.findOne({model: userModel, filter:{email}})

    if (!user) {
        user = await db_service.create({
            model: userModel,
            data:{
                email,
                confirmed: email_verified,
                userName: name,
                profilePicture: picture,
                provider: providerEnum.google
            }
        })
    }

    if(user.provider==providerEnum.system){
        throw new Error("please log in on system only",{cause:400})
 
    }

    const access_token = GenerateToken({
        payload:{id:user._id, email:user.email},
        secret_key: secret_key,
        options: {expiresIn:60*3}
    })

    successResponse({res, message: "success signUp" , data: {access_token}})

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
        secret_key: secret_key,
        options: {expiresIn:60*3,
        // issuer: "http://localhost:300",
        // audience: "http://localhost:4000", 
        // jwtid: uuidv4()
        }
    })

    successResponse({res,data: {access_token}})
}


export const getProfile = async (req,res,next)=> {
    successResponse({res, message:"done", data: req.user })
}

export const shareProfile = async (req, res, next) => {

    const { id } = req.params

    const user = await db_service.findById({
        model: userModel,
        id,
        select: "-password"
    })

    if (!user) {
        throw new Error("user not exist yet");
    }
    user.phone = decrypt(user.phone)

    successResponse({ res, data: user })
}

