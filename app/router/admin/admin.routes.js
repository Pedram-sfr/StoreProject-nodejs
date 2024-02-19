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
const router = require("express").Router();

router.use("/category",CategoryRoutes)
router.use("/blogs",BlogAdminApiRoutes)
router.use("/products",AdminApiProductRoutes)
router.use("/courses",AdminApiCourseRouter)
router.use("/chapter",AdminApiChapterRoutes)
router.use("/episode",AdminApiEpisodeRoutes)
router.use("/user",AdminApiUserRoutes)
router.use("/role",AdminApiRoleRoutes)
router.use("/permission",AdminApiPermissionRoutes)

module.exports = {
   AdminRoutes : router
}