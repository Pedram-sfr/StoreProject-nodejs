const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { PublicCategoryType, UserType } = require("./public.types");
const { CommentType } = require("./comment.type");
const FeatureType = new GraphQLObjectType({
    name: "feature",
    fields: {
        length: {type: GraphQLString},
        height: {type: GraphQLString},
        width: {type: GraphQLString},
        weight: {type: GraphQLString},
        colors: {type: new GraphQLList(GraphQLString)},
        model: {type: new GraphQLList(GraphQLString)},
        madein: {type: GraphQLString}
    }
})
const ProductType = new GraphQLObjectType({
    name: "ProductType",
    fields: {
        _id: {type: GraphQLString},
        supplier: {type: UserType},
        title: {type: GraphQLString},
        short_text: {type: GraphQLString},
        text: {type: GraphQLString},
        imageUrl: {type: new GraphQLList(GraphQLString)},
        tags: {type: new GraphQLList(GraphQLString)},
        category: {type: PublicCategoryType},
        price: {type: GraphQLInt },
        discount: {type: GraphQLInt },
        count: {type: GraphQLInt },
        type: {type: GraphQLString },
        feature: {type: FeatureType},
        comments: {type: new GraphQLList(CommentType)},
        likes: {type: GraphQLList(UserType)},
        dislikes: {type: GraphQLList(UserType)},
        bookmarks: {type: GraphQLList(UserType)},

    }
})

module.exports = {
    ProductType
}