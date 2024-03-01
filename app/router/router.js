const { graphqlHTTP } = require("express-graphql");
const { VerifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
const redisClient = require("../utils/init_redis");
const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");
const { UserAuthRoutes } = require("./user/auth");
const { graphqlConfiq } = require("../utils/graphql.config");
const { ApiPayment } = require("./api/payment");
const router = require("express").Router()
router.use("/",HomeRoutes);
router.use("/graphql",graphqlHTTP(graphqlConfiq));
router.use("/admin",VerifyAccessToken,AdminRoutes);
router.use("/developer",DeveloperRoutes)
router.use("/user",UserAuthRoutes);
router.use("/",ApiPayment);
module.exports = {
    AllRoutes: router
}