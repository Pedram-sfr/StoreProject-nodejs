const { CategoryController } = require("../../http/controllers/admin/category/category.controller");

const router = require("express").Router();
router.post("/add-cat",CategoryController.addCategory)
router.get("/get-parents",CategoryController.getAllParents)
router.get("/all-cat",CategoryController.getAllCategory)
router.get("/get-child/:parent",CategoryController.getChildOfParent)
router.delete("/remove-cat/:id",CategoryController.removeCategory)
router.get("/get-cat/:id",CategoryController.getCategoryById)
router.patch("/update-cat/:id",CategoryController.editCategory)
router.get("/list-of-all-cat",CategoryController.getAllCategoryWithOutPopulate)

module.exports = {
    CategoryRoutes : router
}