const { BlogAdminApiRoutes } = require("./blog");
const { CategoryRoutes } = require("./category");
const { VerifyAccessToken } = require("../../http/middlewares/verifyAccessToken")
const router = require("express").Router();

router.use("/category",CategoryRoutes)
router.use("/blogs",VerifyAccessToken,BlogAdminApiRoutes)

module.exports = {
   AdminRoutes : router
}