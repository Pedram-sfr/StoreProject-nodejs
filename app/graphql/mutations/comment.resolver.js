const { GraphQLString } = require("graphql");
const { BlogModel } = require("../../model/blogs");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const createHttpError = require("http-errors");
const { VerifyAccessTokenInQraphQl } = require("../../http/middlewares/verifyAccessToken");
const { ResponseType } = require("../typeDefs/public.types");
const { copyObject } = require("../../utils/functions");
const { default: mongoose } = require("mongoose");
const { CourseModel } = require("../../model/course");
const { ProductModel } = require("../../model/products");
const { checkExistProduct, checkExistBlog, checkExistCourse } = require("../utils");

const CreateCommentForBlog ={
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        blogID: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async (_,args,context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {comment,blogID,parent} = args;
        if(!mongoose.isValidObjectId(blogID)) throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمیباشد")
        await checkExistBlog(blogID);
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDoc = await getCommentById(BlogModel,parent);
            if(commentDoc && !commentDoc?.openToComment) throw createHttpError.BadGateway("ثبت پاسخ امکان پذیر نیست");
            const createAnswersResault = await BlogModel.updateOne({
                "comments._id" : parent},{
                $push:{
                    "comments.$.answers":{
                        comment,
                        user: user._id,
                        openToComment : false,
                        show: false,
                    }
                }
            })
            if(!createAnswersResault.modifiedCount) throw createHttpError.InternalServerError("پاسخ شما ثبت نشد")
            return {
                statusCode: HttpStatus.CREATED,
                data:{
                message: "پاسخ شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود"
                },
                errors: null
            }
        }else{
            await BlogModel.updateOne({_id: blogID},{
                $push:{
                    comments:{
                        comment,
                        user: user._id,
                        show: false,
                        openToComment : true
                    }

                }
            })
        }
        return {
            statusCode: HttpStatus.CREATED,
            data:{
                message: "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود"
            },
            errors: null
        }
    }
}
const CreateCommentForProduct ={
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        productID: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async (_,args,context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {comment,productID,parent} = args;
        if(!mongoose.isValidObjectId(productID)) throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمیباشد")
        await checkExistProduct(productID);
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDoc = await getCommentById(ProductModel,parent);
            console.log(commentDoc);
            if(commentDoc && !commentDoc?.openToComment) throw createHttpError.BadGateway("ثبت پاسخ امکان پذیر نیست");
            const createAnswersResault = await ProductModel.updateOne({
                "comments._id" : parent},{
                $push:{
                    "comments.$.answers":{
                        comment,
                        user: user._id,
                        openToComment : false,
                        show: false,
                    }
                }
            })
            if(!createAnswersResault.modifiedCount) throw createHttpError.InternalServerError("پاسخ شما ثبت نشد")
            return {
                statusCode: HttpStatus.CREATED,
                data:{
                message: "پاسخ شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود"
                },
                errors: null
            }
        }else{
            await ProductModel.updateOne({_id: productID},{
                $push:{
                    comments:{
                        comment,
                        user: user._id,
                        show: false,
                        openToComment : true
                    }

                }
            })
        }
        return {
            statusCode: HttpStatus.CREATED,
            data:{
                message: "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود"
            },
            errors: null
        }
    }
}
const CreateCommentForCourse ={
    type: ResponseType,
    args: {
        comment: {type: GraphQLString},
        courseID: {type: GraphQLString},
        parent: {type: GraphQLString}
    },
    resolve: async (_,args,context) => {
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {comment,courseID,parent} = args;
        if(!mongoose.isValidObjectId(courseID)) throw createHttpError.BadRequest("شناسه ارسال شده صحیح نمیباشد")
        await checkExistCourse(courseID);
        if(parent && mongoose.isValidObjectId(parent)){
            const commentDoc = await getCommentById(CourseModel,parent);
            if(commentDoc && !commentDoc?.openToComment) throw createHttpError.BadGateway("ثبت پاسخ امکان پذیر نیست");
            const createAnswersResault = await CourseModel.updateOne({
                "comments._id" : parent},{
                $push:{
                    "comments.$.answers":{
                        comment,
                        user: user._id,
                        openToComment : false,
                        show: false,
                    }
                }
            })
            if(!createAnswersResault.modifiedCount) throw createHttpError.InternalServerError("پاسخ شما ثبت نشد")
            return {
                statusCode: HttpStatus.CREATED,
                data:{
                message: "پاسخ شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود"
                },
                errors: null
            }
        }else{
            await CourseModel.updateOne({_id: courseID},{
                $push:{
                    comments:{
                        comment,
                        user: user._id,
                        show: false,
                        openToComment : true
                    }

                }
            })
        }
        return {
            statusCode: HttpStatus.CREATED,
            data:{
                message: "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود"
            },
            errors: null
        }
    }
}

async function getCommentById(model,id) {
    const findedComment = await model.findOne({"comments._id": id},{"comments.$": 1});
    const comment = copyObject(findedComment);
    console.log(comment);
    if(!comment?.comments?.[0]) throw createHttpError.NotFound("نظری یافت نشد");
    return comment?.comments?.[0]
}
module.exports = {
    CreateCommentForBlog,
    CreateCommentForProduct,
    CreateCommentForCourse
}