const { GraphQLList, GraphQLString } = require("graphql")
const { ProductModel } = require("../../model/products");
const { ProductType } = require("../typeDefs/product.type");
const { VerifyAccessTokenInQraphQl } = require("../../http/middlewares/verifyAccessToken");

const ProductResolver = {
    type: new GraphQLList(ProductType),
    args:{
        category: {type: GraphQLString}
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const {category}=args;
        req.user = await VerifyAccessTokenInQraphQl(req)
        const findQuery = category? {category} : {};
        return await ProductModel.find(findQuery).populate([
            {path: 'supplier'},
            {path: 'category'},
            {path: 'likes'},
            {path: 'dislikes'},
            {path: 'bookmarks'},
            {path: 'comments.user'},
            {path: 'comments.answers.user'}]);
    }
}

module.exports ={
    ProductResolver
}