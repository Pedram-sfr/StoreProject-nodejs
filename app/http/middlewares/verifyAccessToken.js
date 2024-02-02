const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET_KEY } = require("../../utils/constans");
const createHttpError = require("http-errors");
const { UserModel } = require("../../model/users");

function VerifyAccessToken(req,res,next){
    const headers = req.headers;
    const [bearer,token] = headers?.["access-token"]?.split(" ") || []
    if(token && bearer?.toLowerCase() === "bearer"){
        JWT.verify(token,ACCESS_TOKEN_SECRET_KEY,async(err,payload)=>{
            if(err) return next(createHttpError.Unauthorized("وارد حساب کاریری شوید"))
            const {phone} = payload || {};
            const user = await UserModel.findOne({phone},{password: 0, otp: 0})
            if(!user) return next(createHttpError.Unauthorized("حساب کاربری یافت نشد"))
            req.user = user;
            return next();
        })
    }
    else return next(createHttpError.Unauthorized("وارد حساب کاریری شوید"))
}

module.exports = {
    VerifyAccessToken
}