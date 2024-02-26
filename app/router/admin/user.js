const { UserController } = require("../../http/controllers/admin/user/user.controller");
const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constans");

const router = require("express").Router();

router.get("/list",UserController.getAllUsers)
router.patch("/update-profile",UserController.updateUserProfile)
router.get("/profile",UserController.userProfile)

module.exports = {
    AdminApiUserRoutes : router
}