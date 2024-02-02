const redisClient = require("../utils/init_redis");
const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth");
const router = require("express").Router()
router.use("/",HomeRoutes);
router.use("/admin",AdminRoutes);
router.use("/developer",DeveloperRoutes)
router.use("/user",UserAuthRoutes);
module.exports = {
    AllRoutes: router
}