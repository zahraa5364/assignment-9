import { Router } from "express";
import * as US from "./user.service.js"
import {authentication} from "../../common/middleware/authentication.js"
import { authorization } from "../../common/middleware/authorization.js";
import { roleEnum } from "../../common/enum/user.enum.js";


const userRouter = Router()



userRouter.post("/signUp",US.signUp)
userRouter.post("/signup/gmail",US.signupWithGmail)
userRouter.post("/signIn",US.signIn)
userRouter.get("/profile", authentication,authorization([roleEnum.admin]),US.getProfile)


export default userRouter