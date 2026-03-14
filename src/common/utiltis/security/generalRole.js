import joi from "joi"
import mongoose from "mongoose";

const {Types} = mongoose;


export const general_rules = {
    email: joi.string().email({ tlds: { allow: true }, minDomainSegments: 2, maxDomainSegments: 2 }),
    password: joi.string(),
    cPassword: joi.string().valid(joi.ref("password")),  
    id: joi.string().custom((value,helper)=>{
        const isValid = Types.ObjectId.isValid(value)
        return isValid ? value : helper.message("invalid id")
    }),
    
    file: joi.object({
    }).messages({
        'any.required': "file is required"
    }),
}