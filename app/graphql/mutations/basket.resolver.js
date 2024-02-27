const { GraphQLString, GraphQLInt } = require("graphql");
const { ResponseType } = require("../typeDefs/public.types");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { ProductModel } = require("../../model/products");
const { VerifyAccessTokenInQraphQl } = require("../../http/middlewares/verifyAccessToken");
const { CourseModel } = require("../../model/course");
const { checkExistProduct, checkExistCourse } = require("../utils");
const { UserModel } = require("../../model/users");
const { copyObject } = require("../../utils/functions");
const createHttpError = require("http-errors");

const AddProductToBasket = {
    type: ResponseType,
    args:{
        productID: {type: GraphQLString},
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {productID} = args;
        await checkExistProduct(productID); 
        const product = await findProductInBasket(user._id, productID);
        if(product){
            await UserModel.updateOne({
                    _id: user._id,
                    "basket.products.productID": productID
                },
                {
                    $inc: {
                        "basket.products.$.count": 1
                    }
                }
            )
        }else{
            await UserModel.updateOne({
                    _id: user._id
                },
                {
                    $push: {
                        "basket.products": {
                            productID,
                            count: 1
                        }
                    }
                }
             )
            }
        return {
            statusCode: HttpStatus.OK,
            data:{
                message: "محصول با موفقیت به سبد خرید افزوده شد"
            },
            errors: null
        }
    }
}
const AddCourseToBasket = {
    type: ResponseType,
    args:{
        courseID: {type: GraphQLString},
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {courseID} = args;
        await checkExistCourse(courseID)
        const course = await findCourseInBasket(user._id, courseID);
        if(course){
            await UserModel.updateOne({
                    _id: user._id,
                    "basket.courses.courseID": courseID
                },
                {
                    $inc: {
                        "basket.courses.$.count": 1
                    }
                }
            )
        }else{
            await UserModel.updateOne({
                    _id: user._id
                },
                {
                    $push: {
                        "basket.courses": {
                            courseID,
                            count: 1
                        }
                    }
                }
             )
            }
        return {
            statusCode: HttpStatus.OK,
            data:{
                message: "محصول با موفقیت به سبد خرید افزوده شد"
            },
            errors: null
        }
    }
}
const RemoveProductFromBasket = {
    type: ResponseType,
    args:{
        productID: {type: GraphQLString},
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {productID} = args;
        await checkExistProduct(productID);
        const product = await findProductInBasket(user._id, productID);
        let message;
        if(!product) throw createHttpError.NotFound("محصول مورد نظر در سبد خرید یافت نشد")
        if(product.count > 1){
            await UserModel.updateOne({
                    _id: user._id,
                    "basket.products.productID": productID
                },
                {
                    $inc: {
                        "basket.products.$.count": -1
                    }
                }
            )
            message= "محصول کم شد"
        }else{
            await UserModel.updateOne({
                    _id: user._id,
                    "basket.products.productID": productID
                },
                {
                    $pull: {
                        "basket.products": {
                            productID
                        }
                    }
                }
             )
            message= "محصول حذف شد"

            }
        return {
            statusCode: HttpStatus.OK,
            data:{
                message
            },
            errors: null
        }
    }
}
const RemoveCourseFromBasket = {
    type: ResponseType,
    args:{
        courseID: {type: GraphQLString},
    },
    resolve: async (_,args,context) =>{
        const {req} = context;
        const user = await VerifyAccessTokenInQraphQl(req);
        const {courseID} = args;
        await checkExistCourse(courseID)
        const course = await findCourseInBasket(user._id, courseID);
        let message;
        if(!course) throw createHttpError.NotFound("دوره مورد نظر در سبد خرید یافت نشد")
        if(course.count > 1){
            await UserModel.updateOne({
                    _id: user._id,
                    "basket.courses.courseID": courseID
                },
                {
                    $inc: {
                        "basket.courses.$.count": -1
                    }
                }
            )
            message= "دوره کم شد"
        }else{
            await UserModel.updateOne({
                    _id: user._id,
                    "basket.courses.courseID": courseID
                },
                {
                    $pull: {
                        "basket.courses": {
                            courseID
                        }
                    }
                }
             )
             message= "دوره حذف شد"
            }
        return {
            statusCode: HttpStatus.OK,
            data:{
                message
            },
            errors: null
        }
    }
}
async function findProductInBasket(UserID,ProductID){
    const productBasket = await UserModel.findOne({_id: UserID, "basket.products.productID": ProductID},{"basket.products.$": 1})
    const product = copyObject(productBasket);
    return product?.basket?.products?.[0]
}
async function findCourseInBasket(UserID,CourseID){
    const courseBasket = await UserModel.findOne({_id: UserID, "basket.courses.courseID": CourseID},{"basket.courses.$": 1})
    const course = copyObject(courseBasket);
    return course?.basket?.courses?.[0]
}
module.exports = {
    AddProductToBasket,
    AddCourseToBasket,
    RemoveCourseFromBasket,
    RemoveProductFromBasket
}