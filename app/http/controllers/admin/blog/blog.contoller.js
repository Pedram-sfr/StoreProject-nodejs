const { createBlogSchema } = require("../../../validators/admin/blog.schema");
const Controller = require("../../controller");
const path = require("path")
const { BlogModel } = require("../../../../model/blogs");
const { deleteFileInPublic } = require("../../../../utils/functions");
const createHttpError = require("http-errors");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const blog = require("../../../../router/admin/blog");
class BlogController extends Controller{
    async createBlog(req,res,next){
        try {
            const blogDateBody = await createBlogSchema.validateAsync(req.body)
            req.body.image = (path.join(blogDateBody.fileUploadPath,blogDateBody.filename)).replace(/\\/gi,"/")
            const {title,text,short_text,tags,category } = blogDateBody
            const image = req.body.image;
            const author = req.user._id
            const blog = await BlogModel.create({title,text,short_text,tags,category,image,author } )

            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "بلاگ با موفقیت ایجاد شد"
                },
                errors: null
            })
        } catch (error) {
            deleteFileInPublic(req.body.image)
            next(error)
        }
    }
    async getOneBlogById(req,res,next){
        try {
            const {id} = req.params;
            const blog = await this.findBlog({_id : id});
            return res.status(HttpStatus.OK).json({
                statusCode : HttpStatus.OK,
                data: {
                    blog
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async getListOfBlog(req,res,next){
        try {
            const blogs = await BlogModel.aggregate([
                {$match : {}},
                {$lookup :{
                    from: "users",
                    foreignField: "_id",
                    localField: "author",
                    as: "author"
                }},
                {
                    $unwind: "$author"
                },
                {$lookup :{
                    from: "categories",
                    foreignField: "_id",
                    localField: "category",
                    as: "category"
                }},
                {
                    $unwind: "$category"
                },
                {
                    $project: {
                        "author.bills" : 0,
                        "author.otp" : 0,
                        "author.roles" : 0,
                        "author.discount" : 0,
                        "author.__v" : 0,
                        "category.__v" : 0,
                        "author._id" : 0,
                    }
                }
            ])
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    blogs
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async getCommentsOfBlog(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async deleteBlogById(req,res,next){
        try {
            const {id} = req.params;
            await this.findBlog({_id : id});
            const result = await BlogModel.deleteOne({_id : id});
            if(result.deletedCount == 0) throw createHttpError.InternalServerError("حذف انجام نشد");
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "مقاله با موفقیت حذف شد"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async updateBlogById(req,res,next){
        try {
            const {id} = req.params;
            await this.findBlog({_id : id});
            if(req?.body?.fileUploadPath && req?.body?.filename)
                req.body.image = (path.join(req.body.fileUploadPath,req.body.filename)).replace(/\\/gi,"/");
            let nullishData = [""," ","0",0,null,undefined];
            let blackLisFields = ["comments","like","bookmark","dislike","author"];
            const data = req.body;
            Object.keys(data).forEach(key => {
                if(blackLisFields.includes(key)) delete data[key]
                if(typeof data[key] == "string") data[key] = data[key].trim()
                if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim())
                if(Array.isArray(data[key]) && data[key].length == 0) delete data[key]
                if(nullishData.includes(data[key])) delete data[key]
            })
            const updateResult = await BlogModel.updateOne({_id : id},{$set : data } )
            if(updateResult.modifiedCount == 0) throw createHttpError.InternalServerError("بروز رسانی انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "بلاگ با موفقیت بروزرسانی شد"
                },
                errors: null
            })
        } catch (error) {
            deleteFileInPublic(req?.body?.image)
            next(error)
        }
    }
    async findBlog(query){
        const blog = await BlogModel.findOne(query).populate([{path: "category"},{path: "author",select: ['phone','username','first_name','last_name']}]);
        if(!blog) throw createHttpError.NotFound("مقاله ای یافت نشد");
        return blog;
    }
}

module.exports = {
    AdminBlogComtroller : new BlogController()
}