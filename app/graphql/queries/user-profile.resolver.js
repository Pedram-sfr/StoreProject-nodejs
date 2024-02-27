const { GraphQLList } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { BlogModel } = require("../../model/blogs");
const { VerifyAccessTokenInQraphQl } = require("../../http/middlewares/verifyAccessToken");
const { CourseModel } = require("../../model/course");
const { ProductModel } = require("../../model/products");
const { CourseType } = require("../typeDefs/course.type");
const { ProductType } = require("../typeDefs/product.type");

const GetUserBookmarkBlogs = {
    type: new GraphQLList(BlogType),
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req)
        const blogs = await BlogModel.find({bookmarks: user._id}).populate([
            {path: 'author'},
            {path: 'category'},
            {path: 'likes'},
            {path: 'dislikes'},
            {path: 'bookmarks'}, 
            {path: 'comments.user'},
            {path: 'comments.answers.user'}]);
        return blogs
    }
}
const GetUserBookmarkProduct = {
    type: new GraphQLList(ProductType),
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req)
        const products = await ProductModel.find({bookmarks: user._id}).populate([
            {path: 'supplier'},
            {path: 'category'},
            {path: 'likes'},
            {path: 'dislikes'},
            {path: 'bookmarks'},
            {path: 'comments.user'},
            {path: 'comments.answers.user'}]);
        return products
    }
}
const GetUserBookmarkCourse = {
    type: new GraphQLList(CourseType),
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req)
        const courses = await CourseModel.find({bookmarks: user._id}).populate([
            {path: 'teacher'},
            {path: 'category'},
            {path: 'likes'},
            {path: 'dislikes'},
            {path: 'bookmarks'},
            {path: 'comments.user'},
            {path: 'comments.answers.user'}]);
        return courses
    }
}
module.exports ={
    GetUserBookmarkBlogs,
    GetUserBookmarkProduct,
    GetUserBookmarkCourse
}