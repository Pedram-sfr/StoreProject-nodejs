const Controller = require("../controller");

class SupportController extends Controller{
    async renderChatRoom(req,res,next){
        try {
            return res.render("chat.ejs")
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    SupportController: new SupportController()
}