const { GraphQLList, GraphQLString } = require("graphql")
const { BlogType } = require("../typeDefs/blog.type")
const { BlogModel } = require("../../model/blogs");
const { VerifyAccessTokenInQraphQl } = require("../../http/middlewares/verifyAccessToken");

const BlogResolver = {
    type: new GraphQLList(BlogType),
    args:{
        category: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const {category}=args;
        req.user = await VerifyAccessTokenInQraphQl(req)
        const findQuery = category? {category} : {};
        return await BlogModel.find(findQuery).populate([
            {path: 'author'},
            {path: 'category'},
            {path: 'likes'},
            {path: 'dislikes'},
            {path: 'bookmarks'}, 
            {path: 'comments.user'},
            {path: 'comments.answers.user'}]);
    }
}

module.exports ={
    BlogResolver
}