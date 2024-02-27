const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLList } = require("graphql");
const { UserType, AnyType } = require("./public.types");
const CommentAnswerType = new GraphQLObjectType({
    name: "CommentAnswerType",
    fields:{
        _id : {type: GraphQLString},
        user: {type: UserType},
        comment: {type: GraphQLString},
        show: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString},
    }
})
const CommentType = new GraphQLObjectType({
    name: "commenType",
    fields:{
        _id : {type: GraphQLString},
        user: {type: UserType},
        comment: {type: GraphQLString},
        answers: {type: new GraphQLList(CommentAnswerType)},
        show: {type: GraphQLBoolean},
        createdAt: {type: GraphQLString},
        openToComment: {type: GraphQLBoolean},
    }
})

module.exports ={
    CommentType,
}