const Joi = require("@hapi/joi")
const { MongoIDPatern } = require("../../../utils/constans");
const createHttpError = require("http-errors");
const addRoleSchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان نقش صحیح نمیباشد")),
    permissions: Joi.array().items(Joi.string().pattern(MongoIDPatern)).error(new Error("دسترسی ها صحیح نمیباشد")),
    description : Joi.string().min(0).max(100).error(createHttpError.BadRequest("توضیحات نقش صحیح نمیباشد")),
})
const addPermissionSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createHttpError.BadRequest("نام دسترسی صحیح نمیباشد")),
    description : Joi.string().min(0).max(100).error(createHttpError.BadRequest("توضیحات دسترسی صحیح نمیباشد")),
});
module.exports = {
    addRoleSchema,
    addPermissionSchema
}
