const { AdminBlogComtroller } = require("../../http/controllers/admin/blog/blog.contoller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();

router.get("/",AdminBlogComtroller.getListOfBlog);
router.post("/create-blog",uploadFile.single("image"),stringToArray("tags"),AdminBlogComtroller.createBlog);
router.patch("/update-blog/:id",uploadFile.single("image"),stringToArray("tags"),AdminBlogComtroller.updateBlogById);
router.get("/:id",AdminBlogComtroller.getOneBlogById);
router.delete("/remove-blog/:id",AdminBlogComtroller.deleteBlogById);
module.exports = {
    BlogAdminApiRoutes : router
}