const path = require("path");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { ConversationModel } = require("../../../model/conversation");
const createHttpError = require("http-errors");

class RoomController extends Controller{
    async addRoom(req,res,next){
        try {
            const {name,description,filename,fileUploadPath,namespace} = req.body;
            this.findConversationWithEndpoint(namespace)
            this.findRoomeWithName(name)
            const image = path.join(fileUploadPath,filename).replace(/\\/g,"/");
            const room = {name,description,image};
            await ConversationModel.updateOne({endpoint: namespace},{
                $push: {rooms: room}
            });
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data:{
                    message: "گروه ایجاد شد"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfRoom(req,res,next){
        try {
            const conversation = await ConversationModel.find({},{rooms: 1});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    rooms: conversation.rooms
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async findRoomeWithName(name){
        const room = await ConversationModel.findOne({"rooms.name": name});
        if(room) throw createHttpError.BadRequest("این نام قبلا ذخیره شده است")
    }
    async findConversationWithEndpoint(endpoint){
        const conversation = await ConversationModel.findOne({endpoint});
        if(!conversation) throw createHttpError.NotFound("فضای مکالمه مورد نظر یافت نشد");
        return conversation;
    }
}

module.exports = {
    RoomController: new RoomController()
}