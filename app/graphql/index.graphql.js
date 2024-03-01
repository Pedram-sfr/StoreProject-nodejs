const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { CategoriesResolver, CategoryChildResolver } = require("./queries/category.resolver");
const { GetUserBookmarkBlogs,GetUserBookmarkProduct,GetUserBookmarkCourse,GetUserBasket } = require("./queries/user-profile.resolver");
const { CourseResolver } = require("./queries/course.resolver");
const { CreateCommentForBlog,CreateCommentForCourse,CreateCommentForProduct } = require("./mutations/comment.resolver");
const { LikeProduct, LikeCourse, LikeBlog } = require("./mutations/likes.resolver");
const { BookmarkProduct, BookmarkBlog, BookmarkCourse } = require("./mutations/bookmark.resolver");
const { DisLikeProduct, DisLikeCourse, DisLikeBlog } = require("./mutations/dislikes.resolver");
const { AddCourseToBasket,AddProductToBasket,RemoveCourseFromBasket,RemoveProductFromBasket } = require("./mutations/basket.resolver");

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        blogs: BlogResolver,
        products: ProductResolver,
        categories: CategoriesResolver,
        childOfCategory: CategoryChildResolver,
        courses: CourseResolver,
        GetUserBookmarkBlogs,
        GetUserBookmarkCourse,
        GetUserBookmarkProduct,
        GetUserBasket
    }
})
const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        CreateCommentForBlog,
        CreateCommentForCourse,
        CreateCommentForProduct,
        LikeProduct,
        LikeBlog,
        LikeCourse,
        DisLikeProduct,
        DisLikeBlog,
        DisLikeCourse,
        BookmarkBlog,
        BookmarkCourse,
        BookmarkProduct,
        AddCourseToBasket,
        AddProductToBasket,
        RemoveCourseFromBasket,
        RemoveProductFromBasket
    }
})

const graphQlSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})

module.exports = {
    graphQlSchema
}