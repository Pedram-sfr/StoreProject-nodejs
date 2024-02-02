const Joi = require("@hapi/joi")
const getOtpSchema = Joi.object({
    phone: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل نادرست است.")),
})
const checkOtpSchema = Joi.object({
    phone: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل نادرست است.")),
    code: Joi.string().min(4).max(6).error(new Error("کد ارسال شده صحیح نمیباشد")),
})


module.exports = {
    getOtpSchema,
    checkOtpSchema
}
