const createHttpError = require("http-errors");
const { RoleModel } = require("../../../../model/role");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../../utils/functions");

class RoleController extends Controller{
    async getAllRoles(req,res,next){
        try {
            const roles = await RoleModel.find({});
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    roles
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async createNewRole(req,res,next){
        try {
            const {title,description ,permissions} = await addRoleSchema.validateAsync(req.body);
            await this.findRoleWithTilte(title);
            const role = await RoleModel.create({title,description,permissions});
            if(!role) throw createHttpError.InternalServerError("خطای نامشخص سرور");
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    message: "نقش باموفقیت افزوده شد"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async removeRole(req,res,next){
        try {
            const {feild} = req.params;
            const role = await this.findRoleWithIdOrTitle(feild);
            const removeRoleRes = await RoleModel.deleteOne({_id: role._id});
            if(!removeRoleRes.deletedCount) throw createHttpError.InternalServerError("خطای سرور");
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    message: "نقش با موفقیت حذف گردید"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async updateRoleById(req,res,next){
        try {
            const {id} = req.params;
            const role = await this.findRoleWithIdOrTitle(id);
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data,[])
            const updateRoleRes = await RoleModel.updateOne({_id: role._id},{
                $set: data
            });
            if(!updateRoleRes.modifiedCount) throw createHttpError.InternalServerError("خطای سرور");
            return res.status(HttpStatus.OK).json({
                StatusCode: HttpStatus.OK,
                data: {
                    message: "نقش با موفقیت بروزرسانی گردید"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async findRoleWithTilte(title){
        const role = await RoleModel.findOne({title});
        if(role) throw createHttpError.BadRequest("نقش مورد نظر تکراری است")
    }
    async findRoleWithIdOrTitle(feild){
        let findQuery = mongoose.isValidObjectId(feild)? {_id: feild} : {title: feild}
        const role = await RoleModel.findOne(findQuery);
        if(!role) throw createHttpError.NotFound("نقش مورد نظر یافت نشد");
        return role;
    }
}

module.exports={
    RoleController: new RoleController()
}