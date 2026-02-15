import mongoose from "mongoose";
import { genderEnum, providerEnum } from "../../common/enum/user.enum.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 10,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    phone: String,
    gender: {
        type: String,
        enum: Object.values(genderEnum),
        default: genderEnum.male
    },
    profilePicture: String,
    confirmed: Boolean,
    provider: {
        type: String,
        enum: Object.values(providerEnum),
        default: providerEnum.system
    }

},{
    timestamps: true,
    strictQuery: true,
    toJSON: {virtuals: true}
})

userSchema.virtual("userName")
.get(function(){
    return this.firstName + " " + this.lastName
})
.set(function(v){
    const [firstName,lastName] = v.split(" ")
    this.set({firstName,lastName})
})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel