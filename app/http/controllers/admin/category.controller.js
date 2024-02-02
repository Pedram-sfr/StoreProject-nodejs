const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../model/categories")
const Controller = require("../controller");
const { addCategorySchema } = require("../../validators/admin/category.schema");
class CategoryController extends Controller{

    async addCategory(req,res,next){
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title,parent} = req.body
            const category = await CategoryModel.create({title,parent});
            if(!category) throw createHttpError.InternalServerError("خطای داخلی");
            return res.status(201).json({
                data:{
                    statusCode: 201,
                    message: "دسته بندی با موفقیت اقزوده شد"
                },
                error: null
            })
        } catch (error) {
            next(error)
        }
    }
    async removeCategory(req,res,next){
        try {
            const {id} = req.params;
            const cat = await this.checkExistCategory(id);
            const deleteRes = await CategoryModel.deleteOne({_id: cat._id});
            if(deleteRes.deletedCount == 0) throw createHttpError.InternalServerError("حذف دسته بندی انجام نشد");
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "حذف دسته بندی با موفقیت انحام شد"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    editCategory(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getAllCategory(req,res,next){
        try {
            const category = await CategoryModel.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
                    }
                },
                {
                    $project:{
                        __v:0,
                        "children.__v":0,
                        "children.parent":0,
                    }
                }
            ])
            return res.status(200).json({
                date:{
                    category
                },
                error: null
            })
        } catch (error) {
            next(error)
        }
    }
    getCategoryById(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async getAllParents(req,res,next){
        try {
            const parents = await CategoryModel.find({parent : undefined},{__v:0}) 
            return res.status(200).json({
                date:{
                    parents
                },
                error: null
            })
        } catch (error) {
            next(error)
        }
    }
    async getChildOfParent(req,res,next){
        try {
            const {parent} = req.params;
            const child = await CategoryModel.find({parent},{__v:0,parent:0})
            return res.status(200).json({
                date:{
                    child
                },
                error: null
            })
        } catch (error) {
            next(error)
        }
    }
    async checkExistCategory(id){
        const cat =  await CategoryModel.findById(id);
        if(!cat) throw createHttpError.NotFound("دسته بندی یافت نشد")
        return cat
    }
}

module.exports = {
    CategoryController : new CategoryController()
}