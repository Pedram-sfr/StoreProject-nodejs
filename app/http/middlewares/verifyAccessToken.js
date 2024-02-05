const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");
const createHttpError = require("http-errors");
const { UserModel } = require("../../model/users");
function getToken(headers){
    const [bearer,token] = headers?.authorization?.split(" ") || []
    if(token && bearer?.toLowerCase() === "bearer") return token
    throw createHttpError.Unauthorized("احراز هویت شما انجام نشد | لظفا وارد حساب کاربری خود شوید")
}
function VerifyAccessToken(req,res,next){
    try {
        const token = getToken(req.headers);
        JWT.verify(token,ACCESS_TOKEN_SECRET_KEY,async(err,payload)=>{
            try {
                if(err) throw createHttpError.Unauthorized("وارد حساب کاریری شوید")
                const {phone} = payload || {};
                const user = await UserModel.findOne({phone},{password: 0, otp: 0})
                if(!user) throw createHttpError.Unauthorized("حساب کاربری یافت نشد")
                req.user = user;
                return next();
            } catch (error) {
                next(error)
            }
        })
    }catch (error) {
        next(error)
    }
}
function checkRole(role){
    return function(req,res,next){
       try {
        const user = req.user;
        if(user.roles.includes(role)) return next();
        throw createHttpError.Forbidden("به این بخش دسترسی ندارید")
       } catch (error) {
            next(error)
       }
    }
}
module.exports = {
    VerifyAccessToken,
    checkRole
}