const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { AdminApiProductRoutes } = require("./product");
const { AdminApiCourseRouter } = require("./course");
const { AdminApiChapterRoutes } = require("./chapter");
const { AdminApiEpisodeRoutes } = require("./episode");
const { AdminApiUserRoutes } = require("./user");
const { AdminApiRoleRoutes } = require("./role");
const { AdminApiPermissionRoutes } = require("./permission");
const { checkPermission } = require("../../http/middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constans");
const router = require("express").Router();

router.use("/category",checkPermission([PERMISSIONS.CONTENT_MANAGER]),CategoryRoutes)
router.use("/blogs",checkPermission([PERMISSIONS.TEACHER]),BlogAdminApiRoutes)
router.use("/products",checkPermission([PERMISSIONS.SUPPLIE]),AdminApiProductRoutes)
router.use("/courses",checkPermission([PERMISSIONS.TEACHER]),AdminApiCourseRouter)
router.use("/chapter",checkPermission([PERMISSIONS.TEACHER]),AdminApiChapterRoutes)
router.use("/episode",checkPermission([PERMISSIONS.TEACHER]),AdminApiEpisodeRoutes)
router.use("/user",AdminApiUserRoutes)
router.use("/role",checkPermission([PERMISSIONS.ADMIN]),AdminApiRoleRoutes)
router.use("/permission",checkPermission([PERMISSIONS.ADMIN]),AdminApiPermissionRoutes)

module.exports = {
   AdminRoutes : router
}