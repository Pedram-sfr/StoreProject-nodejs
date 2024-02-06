const { deleteFileInPublic, ListOfImagesFromRequest } = require("../../../utils/functions")
const { createProductSchema } = require("../../validators/admin/product.schema")
const Controller = require("../controller")
const { ProductModel } = require("../../../model/products");
const path = require("path");
const { ObjectIdValidator } = require("../../validators/public.validator");
const createHttpError = require("http-errors");


class ProductController extends Controller{
    async addProduct(req,res,next){
        try {
            const productBody = await createProductSchema.validateAsync(req.body)
            console.log(req.body.color);
            const images = ListOfImagesFromRequest(req?.files || [],req.body.fileUploadPath)
            const {title,text,short_text,tags,category,price,type,count,discount,width,height,length,weight } = productBody;
            const supplier = req.user._id
            let feture ={};
            // feture.colors = colors;
            if(!isNaN(+width) || !isNaN(+height) || !isNaN(+length) || !isNaN(+weight)){
                if(!width) feture.width = 0;
                    else feture.width = +width;
                if(!height) feture.height = 0;
                    else feture.height = +height;
                if(!length) feture.length = 0;
                    else feture.length = +length;
                if(!weight) feture.weight = 0;
                    else feture.weight = +weight;
            }
            const product = await ProductModel.create({supplier,title,text,short_text,tags,category,type,price,count,discount,feture,images,type})
            return res.status(201).json({
                data:{
                    statusCode: 201,
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
            return res.status(200).json({
                data: {
                    statusCode: 200,
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
            const product = await ProductModel.find({});
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    product
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
            return res.status(200).json({
                data: {
                    statusCode: 200,
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