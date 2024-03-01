
const createHttpError = require("http-errors");
const { GetUserOfBasket } = require("../../../utils/functions");
const Controller = require("../controller");
const { default: axios } = require("axios");

class PaymentController extends Controller{
    async PaymentGetway(req,res,next){
        try {
            const user = req.user;
            if(user.basket.courses.length == 0 && user.basket.products.length == 0) throw createHttpError.BadRequest("سبد خرید شما خالی میباشد")
            const basket = (await GetUserOfBasket(user._id))?.[0]
            if(!basket?.payDetail?.paymentAmount) throw createHttpError.BadRequest("مشخصات پرداخت یافت نشد")
            const zarinpal_req_url = "https://api.zarinpal.com/pg/v4/payment/request.json"
            const zarinpal_options = {
                merchant_id: "F0313F0406E387EF47B96E9FF1BBEAA8778C",
                amount: basket?.payDetail?.paymentAmount,
                description: "بابت خرید دوره یا محصولات",
                metadata: {
                    mobile: user.phone,
                    email: user?.email || "example@domain.com"
                },
                callback_url: "http://localhost:5000/verify"
            }
            const RequestResult = await axios.post(zarinpal_req_url,zarinpal_options).then(result => result.data)
            if(RequestResult.data.code == 100 && RequestResult.data.authority){
                return res.json(RequestResult)
            }
            throw createHttpError.BadRequest("پارامترهای ارسال شده صحیح نمیباشد")
        } catch (error) {
            next(error)
        }
    }
    
}

module.exports ={
    PaymentController: new PaymentController()
}