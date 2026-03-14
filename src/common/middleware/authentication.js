import userModel from "../../DB/models/user.model.js"
import { VerifyToken } from "../utiltis/token.service.js"
import * as db_service from "../../DB/db.service.js"
import {secret_key,PREFIX} from "../../../config/config.service.js"



export const authentication =async (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        throw new Error("token not exist")
    }

    const [prefix,token]= authorization.split(" ")//[bearer,token]
    if (prefix !== PREFIX){
        throw new Error("invalid token prefix")
    }

    const decoded = VerifyToken({token,secret_key:secret_key})

    if (!decoded?.id) {
        throw new Error("invalid token payload");
    }

    const user = await db_service.findOne({ model: userModel, filter: { _id: decoded.id } });
    if (!user) {
        throw new Error("user not exist", { cause: 400 });
    }

    if (user?.changeCredential?.getTime() > decoded.iat * 1000) {
        throw new Error("token expired");
    }

    const revokeToken = await get(revoked_key({ userId: decoded.id, jti: decoded.jti }));
    if (revokeToken) {
        throw new Error("invalid token revoked");
    }

    req.user = user;
    req.decoded = decoded;
    next();
}