const { PaymentController } = require("../../http/controllers/api/payment.controller");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");

const router = require("express").Router();
router.post("/payment",VerifyAccessToken,PaymentController.PaymentGetway)
router.post("/verify",()=>{})
module.exports = {
    ApiPayment : router
}