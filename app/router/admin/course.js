const { CourseController } = require("../../http/controllers/admin/course/course.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFile } = require("../../utils/multer");

const router = require("express").Router();
router.get("/list",CourseController.getListOfCourse)
router.get("/:id",CourseController.getCourseByID)
router.post("/add",uploadFile.single("image"),stringToArray("tags"),CourseController.addCourse);
router.patch("/update/:id",uploadFile.single("image"),stringToArray("tags"),CourseController.updateCourseById);
module.exports = {
    AdminApiCourseRouter : router
}