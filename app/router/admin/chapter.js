const { ChapaterController } = require("../../http/controllers/admin/course/chapter.controller");

const router = require("express").Router();

router.put("/add",ChapaterController.addChapter)
router.get("/list/:courseID",ChapaterController.chaptersOfCourse)
router.patch("/remove/:chapterID",ChapaterController.removeChapterById)
router.patch("/update/:chapterID",ChapaterController.updateChapterById)

module.exports = {
    AdminApiChapterRoutes : router
}