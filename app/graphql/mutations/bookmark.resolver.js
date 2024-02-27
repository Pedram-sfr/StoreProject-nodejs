const { GraphQLString } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { ProductModel } = require("../../model/products");
const { VerifyAccessTokenInQraphQl } = require("../../http/middlewares/verifyAccessToken");
const { CourseModel } = require("../../model/course");
const { BlogModel } = require("../../model/blogs");
const { checkExistProduct, checkExistBlog, checkExistCourse } = require("../utils");

const BookmarkProduct = {
    type: ResponseType,
    args:{
        productID: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {productID} = args;
        await checkExistProduct(productID);
        let bookmarked = await ProductModel.findOne({
            _id: productID,
            bookmarks: user._id
        })
        const updateQuery = bookmarked? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}}
        await ProductModel.updateOne({_id: productID},updateQuery)
        if(!bookmarked){
            message= "ذخیره مقاله با موفقیت انجام شد"
        }
        else message= "ذخیره مقاله برداشته شد"
        return {
            statusCode: HttpStatus.OK,
            data:{
            message
            },
            errors: null
        }
    }
}
const BookmarkBlog = {
    type: ResponseType,
    args:{
        blogID: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {blogID} = args;
        let message;
        await checkExistBlog(blogID)
        let bookmarked = await BlogModel.findOne({
            _id: blogID,
            bookmarks: user._id
        })
        const updateQuery = bookmarked? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}}
        await BlogModel.updateOne({_id: blogID},updateQuery)
        if(!bookmarked){
            message= "ذخیره مقاله با موفقیت انجام شد"
        }
        else message= "ذخیره مقاله برداشته شد"
        return {
            statusCode: HttpStatus.OK,
            data:{
            message
            },
            errors: null
        }
    }
}
const BookmarkCourse = {
    type: ResponseType,
    args:{
        courseID: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {courseID} = args;
        await checkExistCourse(courseID)
        let bookmarked = await CourseModel.findOne({
            _id: courseID,
            bookmarks: user._id
        })
        const updateQuery = bookmarked? {$pull: {bookmarks: user._id}} : {$push: {bookmarks: user._id}}
        await CourseModel.updateOne({_id: courseID},updateQuery)
        if(!bookmarked){
            message = "ذخیره مقاله با موفقیت انجام شد"
        }
        else message= "ذخیره مقاله برداشته شد"
        return {
            statusCode: HttpStatus.OK,
            data:{
            message
            },
            errors: null
        }
    }
}

module.exports = {
    BookmarkBlog,
    BookmarkCourse,
    BookmarkProduct
}