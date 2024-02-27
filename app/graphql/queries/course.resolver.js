const { GraphQLList, GraphQLString } = require("graphql")
const { VerifyAccessTokenInQraphQl } = require("../../http/middlewares/verifyAccessToken");
const { CourseType } = require("../typeDefs/course.type");
const { CourseModel } = require("../../model/course");

const CourseResolver = {
    type: new GraphQLList(CourseType),
    args:{
        category: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const {category}=args;
        req.user = await VerifyAccessTokenInQraphQl(req)
        const findQuery = category? {category} : {};
        return await CourseModel.find(findQuery).populate([
            {path: 'teacher'},
            {path: 'category'},
            {path: 'likes'},
            {path: 'dislikes'},
            {path: 'bookmarks'},
            {path: 'comments.user'},
            {path: 'comments.answers.user'}]);
    }
}

module.exports ={
    CourseResolver
}