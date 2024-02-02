const createHttpError = require("http-errors");
const { getOtpSchema , checkOtpSchema } = require("../../../validators/user/auth.schema");
const { numberRandom, SignAccessToken, VerifyRefreshToken, SignRefreshToken } = require("../../../../utils/functions");
const {UserModel} = require("./../../../../model/users");
const { ROLES } = require("../../../../utils/constans");
const Controller = require("../../controller");
class UserAuthController extends Controller{
    async getOtp(req,res,next){
        try {
            await getOtpSchema.validateAsync(req.body);
            const {phone}= req.body;
            const code = numberRandom();
            const result = await this.saveUser(phone,code);
            if(!result) throw createHttpError.Unauthorized("ورود ناموفق")
            return res.status(200).send({
                data: {
                    statusCode: 200,
                    message: "کد یکبار مصرف برای شما ارسال گردید",
                    code,
                    phone
                },
                error: {}
            })
        } catch (error) {
            next(error)
        }
    }
    async checkOtp(req,res,next){
        try {
            await checkOtpSchema.validateAsync(req.body)
            const {phone,code} = req.body;
            const user = await UserModel.findOne({phone});
            if(!user) throw createHttpError.NotFound("کاربر یافت نشد");
            if(user.otp.code != code) throw createHttpError.Unauthorized("کد ارسال شده نادرست است");
            const now = Date.now();
            if(user.otp.expiresIn < now) throw createHttpError.Unauthorized("کد شما منقضی شده است");
            const accessToken = await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);
            return res.json({
                data:{
                    accessToken,
                    refreshToken
                },
                error: null
            })
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req,res,next){
        try {
            const {refreshToken} = req.body;
            const phone = await VerifyRefreshToken(refreshToken);
            const user = await UserModel.findOne({phone});
            const accessToken = await SignAccessToken(user._id);
            const newRefreshToken = await SignRefreshToken(user._id);
            return res.json({
                data: {
                    accessToken,
                    refreshToken: newRefreshToken
                },
                error: null
            })
        } catch (error) {
            next(error)
        }
    }
    async saveUser(phone,code){
        let otp = {
            code,
            expiresIn: (new Date().getTime() + 120000)
        }
        const res = await this.checkExisUser(phone);
        if(res){
           return (await this.updateUser(phone,{otp}))
        }
        return !!(await UserModel.create({
            phone,
            otp,
            roles: [ROLES.USER]
        }))
    }
    async checkExisUser(phone){
        const user = await UserModel.findOne({phone});
        return !!user;
    }
    async updateUser(phone,objectData = {}){
        Object.keys(objectData).forEach(key =>{
            if([""," ",0,null,NaN,undefined,"0"].includes(objectData[key])) delete objectData[key]
        })
        const updateRes = await UserModel.updateOne({phone},{$set : objectData})
        return !!updateRes.modifiedCount
    }
}

module.exports= {
    UserAuthController: new UserAuthController()
}
