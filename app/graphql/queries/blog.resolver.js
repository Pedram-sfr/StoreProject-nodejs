const { GraphQLList } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { BlogModel } = require("../../model/blogs");
const { VerifyAccessTokenInQraphQl } = require("../../http/middlewares/verifyAccessToken");

const BlogResolver = {
    type: new GraphQLList(BlogType),
    resolve: async (_,args,context) =>{
        const {req} = context;
        req.user = await VerifyAccessTokenInQraphQl(req)
        console.log(req.user);
        return await BlogModel.find({}).populate([{path: 'author'},{path: 'category'}]);
    }
}

module.exports ={
    BlogResolver
}