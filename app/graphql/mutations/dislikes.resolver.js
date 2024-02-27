const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { ProductModel } = require("../../model/products");
const { VerifyAccessTokenInQraphQl } = require("../../http/middlewares/verifyAccessToken");
const { CourseModel } = require("../../model/course");
const { BlogModel } = require("../../model/blogs");
const { checkExistProduct, checkExistBlog, checkExistCourse } = require("../utils");

const DisLikeProduct = {
    type: ResponseType,
    args:{
        productID: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {productID} = args;
        await checkExistProduct(productID);
        let message;
        let liked = await ProductModel.findOne({
            _id: productID,
            likes: user._id
        })
        let disliked = await ProductModel.findOne({
            _id: productID,
            dislikes: user._id
        })
        const updateQuery = disliked? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}}
        await ProductModel.updateOne({_id: productID},updateQuery)
        if(!disliked){
            if(liked) await ProductModel.updateOne({_id: productID},{$pull: {likes: user._id}})
            message= "پسندیده نشد";
        }else message = "پسندیده شد"
        return {
            statusCode: HttpStatus.CREATED,
            data:{
            message
            },
            errors: null
        }
    }
}
const DisLikeBlog = {
    type: ResponseType,
    args:{
        blogID: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {blogID} = args;
        await checkExistBlog(blogID)
        let message;
        let liked = await BlogModel.findOne({
            _id: blogID,
            likes: user._id
        })
        let disliked = await BlogModel.findOne({
            _id: blogID,
            dislikes: user._id
        })
        const updateQuery = disliked? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}}
        await BlogModel.updateOne({_id: blogID},updateQuery)
        if(!disliked ){
            if(liked) await BlogModel.updateOne({_id: blogID},{$pull: {likes: user._id}})
            message= "پسندیده نشد";
        }else message = "پسندیده شد"
        return {
            statusCode: HttpStatus.CREATED,
            data:{
            message
            },
            errors: null
        }
    }
}
const DisLikeCourse = {
    type: ResponseType,
    args:{
        courseID: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {courseID} = args;
        await checkExistCourse(courseID)
        let message;
        let liked = await CourseModel.findOne({
            _id: courseID,
            likes: user._id
        })
        let disliked = await CourseModel.findOne({
            _id: courseID,
            dislikes: user._id
        })
        const updateQuery = disliked? {$pull: {dislikes: user._id}} : {$push: {dislikes: user._id}}
        await CourseModel.updateOne({_id: courseID},updateQuery)
        if(!disliked){
            if(liked) await CourseModel.updateOne({_id: courseID},{$pull: {likes: user._id}})
            message= "پسندیده نشد";
        }else message = "پسندیده شد"
        return {
            statusCode: HttpStatus.CREATED,
            data:{
            message
            },
            errors: null
        }
    }
}

module.exports = {
    DisLikeBlog,
    DisLikeCourse,
    DisLikeProduct
}