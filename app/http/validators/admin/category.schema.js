const Joi = require("@hapi/joi")
const { MongoIDPatern } = require("../../../utils/constans")
const addCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد")),
    parent: Joi.string().allow("").pattern(MongoIDPatern).error(new Error("شناسه وارد شده صحیح نمیباشد"))
})
const updateCategorySchema = Joi.object({
    title: Joi.string().min(3).max(30).error(new Error("عنوان دسته بندی صحیح نمیباشد"))
})

module.exports = {
    addCategorySchema,
    updateCategorySchema
}
