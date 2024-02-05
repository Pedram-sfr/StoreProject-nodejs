const Joi = require("@hapi/joi");
const createError = require("http-errors");
const { MongoIDPatern } = require("../../../utils/constans")

const createBlogSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
    text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    short_text: Joi.string().error(createError.BadRequest("متن ارسال شده صحیح نمیباشد")),
    filename: Joi.string().pattern(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/).error(createError.BadRequest("تصویر ارسال شده صحیح نمیباشد")),
    tags: Joi.array().min(0).max(20).error(createError.BadRequest("برچسب ها نمیتواند بیشتر از 20 ایتم باشد")),
    category: Joi.string().pattern(MongoIDPatern).error(createError.BadRequest("دسته بندی مورد نظر یافت نشد")),
    fileUploadPath : Joi.allow(),
    
});
const updateBlogSchema = Joi.object({
    title : Joi.string().min(3).max(30).error(createError.BadRequest("عنوان دسته بندی صحیح نمیباشد"))
});

module.exports = {
    createBlogSchema,
    updateBlogSchema
}