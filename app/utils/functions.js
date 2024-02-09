const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../model/users");
const fs = require("fs")
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require("./constans");
const redisClient = require("./init_redis");
const path = require("path");
const { features } = require("process");

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
function ListOfImagesFromRequest(files,fileUploadPath){
    if(files?.length > 0){
        return (files.map(file => path.join(fileUploadPath,file.filename))).map(item => item.replace(/\\/gi,"/"))
    }else return [];
}
function copyObject(object){
    return JSON.parse(JSON.stringify(object))
}
function setFeatures(body){
    const {colors,width,weight,height,length} = body
    let feature ={};
    feature.colors = colors;
    if(!isNaN(+width) || !isNaN(+height) || !isNaN(+length) || !isNaN(+weight)){
        if(!width) feature.width = 0;
            else feature.width = +width;
        if(!height) feature.height = 0;
            else feature.height = +height;
        if(!length) feature.length = 0;
            else feature.length = +length;
        if(!weight) feature.weight = 0;
            else feature.weight = +weight;
    }
    return feature;
}
function deleteInvalidPropertyInObject(data = {},blackLisFields=[]){
    let nullishData = [""," ","0",0,null,undefined];
    Object.keys(data).forEach(key => {
        if(blackLisFields.includes(key)) delete data[key]
        if(typeof data[key] == "string") data[key] = data[key].trim()
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if(nullishData.includes(data[key])) delete data[key]
    })
}
module.exports = {
    numberRandom,
    SignAccessToken,
    SignRefreshToken,
    VerifyRefreshToken,
    deleteFileInPublic,
    ListOfImagesFromRequest,
    copyObject,
    setFeatures,
    deleteInvalidPropertyInObject
}