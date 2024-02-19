const createHttpError = require("http-errors");
const { UserModel } = require("../../../../model/users");
const { deleteInvalidPropertyInObject } = require("../../../../utils/functions");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");

class UserController extends Controller{
    async getAllUsers(req,res,next){
        try {
            const {search} = req.query;
            const databaseQuery = {};
            if(search) databaseQuery['$text'] = {$search : search}
            const users = await UserModel.find(databaseQuery);
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data: {
                    users
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async updateUserProfile(req,res,next){
        try {
            const userID = req.user._id;
            const data = req.body;
            const blakList = ["phone", "otp","bills","discount","roles","courses"]
            deleteInvalidPropertyInObject(data,blakList)
            const updateuserResualt = await UserModel.updateOne({_id:userID},{
                $set: data
            })
            if(!updateuserResualt.modifiedCount) throw createHttpError.InternalServerError("به روزرسانی انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data: {
                    message: "به روزرسانی با موفقیت انجام شد"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    UserController : new UserController()
}