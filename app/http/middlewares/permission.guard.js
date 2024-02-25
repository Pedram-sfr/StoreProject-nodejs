const createHttpError = require("http-errors");
const { PermissionModel } = require("../../model/permission");
const { RoleModel } = require("../../model/role");
const { PERMISSIONS } = require("../../utils/constans");

 function checkPermission(requiredPermissions = [] ){
    return async function(req,res,next){
       try {
        const allPermissions = requiredPermissions.flat(2);
        const user = req.user;
        const role = await RoleModel.findOne({title: user.Role});
        const permissions = await PermissionModel.find({_id: {$in: role.permissions}})
        const userPerm = permissions.map(item => item.title);
        const hasPerm = allPermissions.every(permission => {
            return userPerm.includes(permission)
        })
        if(userPerm.includes(PERMISSIONS.ADMIN)) return next()
        if(allPermissions.length == 0 || hasPerm) return next();
        throw createHttpError.Forbidden("به این بخش دسترسی ندارید")
       } catch (error) {
            next(error)
       }
    }
}

module.exports = {
    checkPermission
}