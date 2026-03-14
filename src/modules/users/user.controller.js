import { Router } from "express";
import * as US from "./user.service.js"
import * as UV from "./user.validation.js";
import {authentication} from "../../common/middleware/authentication.js"
import { authorization } from "../../common/middleware/authorization.js";
import { roleEnum } from "../../common/enum/user.enum.js";
import { validation } from "../../common/middleware/validation.js";
import { multer_local,multer_host } from "../../common/middleware/multer.js"
import { multer_enum } from "../../common/enum/multer.enum.js"


const userRouter = Router()

userRouter.post("/signUp", multer_host(multer_enum.image).single("attachments"),validation(UV.signUpSchema) , US.signUp)
userRouter.post("/signup/gmail",US.signupWithGmail)
userRouter.post("/signIn",validation(UV.signInSchema),US.signIn)
userRouter.get("/profile", authentication,authorization([roleEnum.admin]),US.getProfile)
userRouter.get("/refresh-token",US.refresh_token)
userRouter.get("/share-profile/:id",validation(UV.shareProfileSchema),US.shareProfile)
userRouter.patch("/update-profile",validation(UV.updateProfileSchema),authentication,US.updateProfile)
userRouter.patch("/update-password",authentication,validation(UV.updatePasswordSchema),US.updatePassword)


export default userRouter