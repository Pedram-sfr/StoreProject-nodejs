const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { ProductModel } = require("../../model/products");
const { VerifyAccessTokenInQraphQl } = require("../../http/middlewares/verifyAccessToken");
const { CourseModel } = require("../../model/course");
const { BlogModel } = require("../../model/blogs");
const { checkExistProduct, checkExistBlog, checkExistCourse } = require("../utils");

const LikeProduct = {
    type: ResponseType,
    args:{
        productID: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {productID} = args;
        await checkExistProduct(productID);
        let liked = await ProductModel.findOne({
            _id: productID,
            likes: user._id
        })
        let disliked = await ProductModel.findOne({
            _id: productID,
            dislikes: user._id
        })
        const updateQuery = liked? {$pull: {likes: user._id}} : {$push: {likes: user._id}}
        await ProductModel.updateOne({_id: productID},updateQuery)
        if(disliked && !liked){
            await ProductModel.updateOne({_id: productID},{
                $pull: {dislikes: user._id}
            })
        }
        return {
            statusCode: HttpStatus.CREATED,
            data:{
            message: "با موفقیت ثبت شد"
            },
            errors: null
        }
    }
}
const LikeBlog = {
    type: ResponseType,
    args:{
        blogID: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {blogID} = args;
        await checkExistBlog(blogID)
        let liked = await BlogModel.findOne({
            _id: blogID,
            likes: user._id
        })
        let disliked = await BlogModel.findOne({
            _id: blogID,
            dislikes: user._id
        })
        const updateQuery = liked? {$pull: {likes: user._id}} : {$push: {likes: user._id}}
        await BlogModel.updateOne({_id: blogID},updateQuery)
        if(disliked && !liked){
            await BlogModel.updateOne({_id: blogID},{
                $pull: {dislikes: user._id}
            })
        }
        return {
            statusCode: HttpStatus.CREATED,
            data:{
            message: "با موفقیت ثبت شد"
            },
            errors: null
        }
    }
}
const LikeCourse = {
    type: ResponseType,
    args:{
        courseID: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {courseID} = args;
        await checkExistCourse(courseID)
        let liked = await CourseModel.findOne({
            _id: courseID,
            likes: user._id
        })
        let disliked = await CourseModel.findOne({
            _id: courseID,
            dislikes: user._id
        })
        const updateQuery = liked? {$pull: {likes: user._id}} : {$push: {likes: user._id}}
        await CourseModel.updateOne({_id: courseID},updateQuery)
        if(disliked && !liked){
            await CourseModel.updateOne({_id: courseID},{
                $pull: {dislikes: user._id}
            })
        }
        return {
            statusCode: HttpStatus.CREATED,
            data:{
            message: "با موفقیت ثبت شد"
            },
            errors: null
        }
    }
}

module.exports = {
    LikeBlog,
    LikeCourse,
    LikeProduct
}