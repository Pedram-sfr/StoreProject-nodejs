const { ProductController } = require("../../http/controllers/admin/product/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
router.post("/add",uploadFile.array("images",10),stringToArray("colors","tags"),ProductController.addProduct);
router.get("/get-all",ProductController.getAllProducts);
router.get("/:id",ProductController.getOneProduct);
router.delete("/remove/:id",ProductController.removeProduct);
router.patch("/edit/:id",uploadFile.array("images",10),stringToArray("tags","colors"),ProductController.editProduct);
module.exports = {
    AdminApiProductRoutes : router
}