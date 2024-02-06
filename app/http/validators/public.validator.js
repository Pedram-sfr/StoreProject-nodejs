const Joi = require("@hapi/joi");
const { MongoIDPatern } = require("../../utils/constans");
const createHttpError = require("http-errors");
const ObjectIdValidator = Joi.object({
    id: Joi.string().pattern(MongoIDPatern).error(createHttpError.BadRequest("ای دی وارد شده معتبر نمیباشد"))
})

module.exports ={
    ObjectIdValidator
}