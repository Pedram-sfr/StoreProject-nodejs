const { GraphQLObjectType, GraphQLString, GraphQLList } = require("graphql");
const { UserType, PublicCategoryType } = require("./public.types");
const { CommentType } = require("./comment.type");

const BlogType = new GraphQLObjectType({
    name: "blogType",
    fields: {
        _id: {type: GraphQLString},
        author: {type: UserType},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        image: {type: GraphQLString },
        imageUrl: {type: GraphQLString },
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: GraphQLList(UserType)},
        dislikes: {type: GraphQLList(UserType)},
        bookmarks: {type: GraphQLList(UserType)},
    }
})

module.exports = {
    BlogType
}