const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require("graphql");
const { PublicCategoryType, AuthorType } = require("./public.types");
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
        supplier: {type: AuthorType},
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
        feature: {type: FeatureType}
    }
})

module.exports = {
    ProductType
}