const createHttpError = require("http-errors");
const { PermissionModel } = require("../../../../model/permission");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../../utils/functions");

class PermissionController extends Controller{
    async getAllPermissions(req,res,next){
        try {
            const permissions = await PermissionModel.find({});
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    permissions
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async createNewPermission(req,res,next){
        try {
            const {title,description} = await addPermissionSchema.validateAsync(req.body);
            await this.findPermissionWithName(title);
            const permission = await PermissionModel.create({title,description});
            if(!permission) throw createHttpError.InternalServerError("خطای نامشخص سرور");
            return res.status(HttpStatus.CREATED).json({
                StatusCode: HttpStatus.CREATED,
                data: {
                    message: "دسترسی باموفقیت افزوده شد"
                },
                errors: null
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    async removePermission(req,res,next){
        try {
            const {id} = req.params;
            const permission = await this.findPermissionWithId(id);
            const permissionResDelete = await PermissionModel.deleteOne({_id: permission._id});
            if(!permissionResDelete.deletedCount) throw createHttpError.InternalServerError("خطای نامشخص سرور");
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    message: "دسترسی باموفقیت حذف شد"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async updatePermissionById(req,res,next){
        try {
            const {id} = req.params;
            await this.findPermissionWithId(id);
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data,[])
            const updatePermissionRes = await PermissionModel.updateOne({_id: id},{
                $set: data
            });
            if(!updatePermissionRes.modifiedCount) throw createHttpError.InternalServerError("خطای سرور");
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    message: "دسترسی با موفقیت بروزرسانی گردید"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async findPermissionWithName(title){
        const permission = await PermissionModel.findOne({title});
        if(permission) throw createHttpError.BadRequest("دسترسی مورد نظر تکراری است")
    }
    async findPermissionWithId(id){
        const permission = await PermissionModel.findOne({_id: id});
        if(!permission) throw createHttpError.BadRequest("دسترسی مورد نظر یافت نشد");
        return permission;
    }
}

module.exports={
    PermissionController: new PermissionController()
}