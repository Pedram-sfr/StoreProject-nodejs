const Joi = require("@hapi/joi")
const authSchema = Joi.object({
    phone: Joi.string().length(11).pattern(/^09[0-9]{9}$/).error(new Error("شماره موبایل نادرست است.")),
})

module.exports = {
    authSchema
}
