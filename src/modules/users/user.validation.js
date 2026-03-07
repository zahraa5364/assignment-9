import Joi from "joi"
import { genderEnum } from "../../common/enum/user.enum.js"


export const signUpSchema = {
    body: Joi.object({
        userName: Joi.string().min(6).max(30).required(),
        email: Joi.string().email({tlds:{allow:false , deny:["org"]}, maxDomainSegments:2 , minDomainSegments:2}).required(),
        password: Joi.string().min(6).required().messages({
            "any.required": "password must not be empty",
            "string.min": "password is too short"
        }).regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
        cPassword: Joi.string().valid(Joi.ref("password")),
        phone: Joi.string().required(),
        gender: Joi.string().valid(...Object.values(genderEnum)).required(),
        // user: Joi.object({
        //     name: Joi.string().required()
        // }).required() 
    }).required(),
    file: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().required(),
    }).required().messages({
        "any.required" : "file is required"
    })

}

export const signInSchema = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(5).required().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    }).required(),
    
    // query: Joi.object({
    //     flag: Joi.boolean().required()
    // }).required(),
    
}

export const shareProfileSchema = {
    params: Joi.object({
        id: Joi.string().required().length(24).hex()
    }).required(),
}

