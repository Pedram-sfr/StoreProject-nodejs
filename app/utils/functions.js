const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../model/users");
const fs = require("fs")
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constans");
const redisClient = require("./init_redis");
const path = require("path");

function numberRandom(){
    return Math.floor((Math.random() * 90000)+10000)
}
function SignAccessToken(userId){
    return new Promise(async(resolve,reject)=>{
        const user = await UserModel.findById(userId);
        const payload = {
            phone: user.phone
        };
        const options = {
            expiresIn: "1y"
        };
        JWT.sign(payload,ACCESS_TOKEN_SECRET_KEY,options,(err,token)=>{
            if(err) reject(createHttpError.InternalServerError("خطای سرور"));
            resolve(token);
        })
    })
}

function SignRefreshToken(userId){
    return new Promise(async(resolve,reject)=>{
        const user = await UserModel.findById(userId);
        const payload = {
            phone: user.phone
        };
        const options = {
            expiresIn: "1y"
        };
        JWT.sign(payload,REFRESH_TOKEN_SECRET_KEY,options,async(err,token)=>{
            if(err) reject(createHttpError.InternalServerError("خطای سرور"));
            await redisClient.set(String(userId),token,{EX: 31536000},(err)=>{
                if(err) reject(err.message)
            })
            resolve(token);
        })
    })
}

function VerifyRefreshToken(token){
    return new Promise((resolve,reject)=>{
        JWT.verify(token,REFRESH_TOKEN_SECRET_KEY,async(err,payload)=>{
            if(err) reject(createHttpError.Unauthorized("وارد حساب کاریری شوید"))
            const {phone} = payload || {};
            const user = await UserModel.findOne({phone},{password: 0, otp: 0})
            if(!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
            const refreshToken = await redisClient.get(String(user?._id || "key_default"));
            if(!refreshToken) reject(createHttpError.Unauthorized("ورود مجدد انجام نشد"))
            if(token === refreshToken) return resolve(phone);
            reject(createHttpError.Unauthorized("ورود مجدد انجام نشد"))
        })
    })
}
function deleteFileInPublic(fileAddress){
    if(fileAddress){
        const pathFile = path.join(__dirname,"..","..","public",fileAddress)
        if(fs.existsSync(pathFile)) fs.unlinkSync(pathFile)
    }
}
module.exports = {
    numberRandom,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic
}