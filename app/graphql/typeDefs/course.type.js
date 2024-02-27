const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { PublicCategoryType, UserType } = require("./public.types");
const { CommentType } = require("./comment.type");
const EpisodeType = new GraphQLObjectType({
    name: "EpisodeType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        videoAddress: {type: GraphQLString},
        videoUrl: {type: GraphQLString},
        type: {type: GraphQLString },
        time: {type: GraphQLString },
    }
})
const ChapterType = new GraphQLObjectType({
    name: "ChapterType",
    fields: {
        _id: {type: GraphQLString},
        title: {type: GraphQLString},
        text: {type: GraphQLString},
        episodes: {type: new GraphQLList(EpisodeType)}
    }
})
const CourseType = new GraphQLObjectType({
    name: "CourseType",
    fields: {
        _id: {type: GraphQLString},
        teacher: {type: UserType},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        imageUrl: {type: GraphQLString},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
        price: {type: GraphQLInt },
        discount: {type: GraphQLInt },
        count: {type: GraphQLInt },
        type: {type: GraphQLString },
        status: {type: GraphQLString },
        chapters: {type: new GraphQLList(ChapterType)},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: GraphQLList(UserType)},
        dislikes: {type: GraphQLList(UserType)},
        bookmarks: {type: GraphQLList(UserType)},
    }
})

module.exports = {
    CourseType
}