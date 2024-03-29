const { UserModel } = require("../../../model/users");
const { SignAccessToken } = require("../../../utils/functions");
const Controller = require("../controller");

class SupportController extends Controller{
    async renderChatRoom(req,res,next){
        try {
            return res.render("chat.ejs")
        } catch (error) {
            next(error)
        }
    }
    async loginForm(req,res,next){
        try {
            return res.render("login.ejs",{
                error: undefined
            })
        } catch (error) {
            next(error)
        }
    }
    async login(req,res,next){
        try {
            const {mobile} = req.body;
            const user = await UserModel.findOne({phone: mobile});
            if(!user) return res.render("login.ejs",{
                error: "نام کاربری صحیح نمیباشد"
            })
            const token = await SignAccessToken(user._id);
            user.token = token;
            user.save();
            res.cookie("authorization",token,{signed: true,httpOnly: true,expires: new Date(Date.now() + 1000*60*60)})
            return res.redirect("/support");
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    SupportController: new SupportController()
}