import { Router } from "express";
import * as US from "./user.service.js"
import {authentication} from "../../common/middleware/authentication.js"
import { decryptRSA } from "../../common/utiltis/asymmetric.security.js"
const userRouter = Router()



userRouter.post("/signUp",US.signUp)
userRouter.post("/signIn",US.signIn)
userRouter.get("/profile", authentication ,US.getProfile)
userRouter.post("/verifyOtp", async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const decryptedOtp = decryptRSA(otp);
        console.log(`Decrypted OTP for ${email}: `, decryptedOtp);
        res.json({ message: "OTP verified successfully", otp: decryptedOtp });
    } catch (err) {
        next(err);
    }
})


export default userRouter