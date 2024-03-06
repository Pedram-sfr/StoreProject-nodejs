const createHttpError = require("http-errors");
const { ConversationModel } = require("../../../model/conversation");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
class NamespaceController extends Controller{
    async addNamespace(req,res,next){
        try {
            const {title,endpoint} = req.body;
            await this.findNamespaceWithEndpoint(endpoint);
            const conversation = await ConversationModel.create({title,endpoint});
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data:{
                    message: "فضای مکالمه ایجاد شد"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfNamespaces(req,res,next){
        try {
            const namespaces = await ConversationModel.find({},{rooms: 0});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    namespaces
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }

    async findNamespaceWithEndpoint(endpoint){
        const conversation = await ConversationModel.findOne({endpoint});
        if(conversation) throw createHttpError.BadRequest("فضا با این نام قبلا ذخیره شده است")
    }
}

module.exports = {
    NamespaceController: new NamespaceController()
}