const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken");
const { AdminApiProductRoutes } = require("./product");
const router = require("express").Router();

router.use("/category",CategoryRoutes)
router.use("/blogs",BlogAdminApiRoutes)
router.use("/products",AdminApiProductRoutes)

module.exports = {
   AdminRoutes : router
}