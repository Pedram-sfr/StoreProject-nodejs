const { deleteFileInPublic, ListOfImagesFromRequest, copyObject, setFeatures, deleteInvalidPropertyInObject } = require("../../../utils/functions")
const { createProductSchema } = require("../../validators/admin/product.schema")
const Controller = require("../controller")
const { ProductModel } = require("../../../model/products");
const path = require("path");
const { ObjectIdValidator } = require("../../validators/public.validator");
const createHttpError = require("http-errors");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const ProductBlackList = {
    BOOKMARKS: "bookmarks",
    LIKES: "likes",
    DISLIKES: "dislikes",
    COMMENTS: "comments",
    SUPPLIER: "supplier",
    WEIGHT: "weight",
    WIDTH: "width",
    LENGTH: "length",
    HEIGHT: "height",
    COLORS: "colors"
  }
  Object.freeze(ProductBlackList)
class ProductController extends Controller{
    async addProduct(req,res,next){
        try {
            const productBody = await createProductSchema.validateAsync(req.body);
            const images = ListOfImagesFromRequest(req?.files || [],req.body.fileUploadPath)
            const {title,text,short_text,tags,category,price,type,count,discount } = productBody;
            const supplier = req.user._id
            const feature = setFeatures(req.body);
            const product = await ProductModel.create({supplier,title,text,short_text,tags,category,type,price,count,discount,feature,images,type})
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data:{
                    message: "ثبت محصول با موفقیت انجام شد"
                },
                error: null
            })
        } catch (error) {
            deleteFileInPublic(req.body.images)
            next(error)
        }
    }
    async editProduct(req,res,next){
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            const data = copyObject(req.body);
            data.images = ListOfImagesFromRequest(req?.files || [],req.body.fileUploadPath);
           data.feature = setFeatures(req.body);
            let blackLisFields = Object.values(ProductBlackList);
            deleteInvalidPropertyInObject(data,blackLisFields)
            const productUpdateResault = await ProductModel.updateOne({_id: product._id},{$set: data})
            if(productUpdateResault.modifiedCount == 0 ) throw {data: null,errors:{statusCode: HttpStatus.InternalServerError , message: "خطا در انجام عملیات"}};
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    message : "عملیات با موفقیت انجام شد"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async removeProduct(req,res,next){
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            const removeProductResult = await ProductModel.deleteOne({_id:product._id});
            if(removeProductResult.deletedCount == 0 ) throw createHttpError.InternalServerError("خطای سرور")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "حذف محصول با موفقیت انجام شد"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async getAllProducts(req,res,next){
        try {
            const search = req?.query?.search || "";
            let products;
            if(search){
               products = await ProductModel.find({
                    $text:{
                        $search: new RegExp(search,"ig")
                    }
                });
            }else
                products = await ProductModel.find({});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    products
                },
                errors: null

            })
        } catch (error) {
            next(error)
        }
    }
    async getOneProduct(req,res,next){
        try {
            const {id} = req.params;
            const product = await this.findProductById(id);
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    product
                },
                errors: null
            })
            
        } catch (error) {
            next(error)
        }
    }
    async findProductById(productID){
        const {id} = await ObjectIdValidator.validateAsync({id: productID});
        const product = await ProductModel.findById(id);
        if(!product) throw createHttpError.NotFound("محصولی یافت نشد");
        return product
    }
}

module.exports = {
    ProductController : new ProductController()
}