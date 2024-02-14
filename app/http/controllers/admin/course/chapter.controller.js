const createHttpError = require("http-errors");
const { CourseModel } = require("../../../../model/course");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const Controller = require("../../controller");
const { CourseController } = require("./course.controller");
const { deleteInvalidPropertyInObject } = require("../../../../utils/functions");

class ChapaterController extends Controller{
    async addChapter(req,res,next){
        try {
            const {id,title,text} = req.body;
            await CourseController.findCourseById(id);
            const saveChapter = await CourseModel.updateOne({_id: id},{$push: {
                chapters: {title,text,episodes: []}
            }});
            if(saveChapter.modifiedCount == 0) throw createHttpError.InternalServerError("فصل افزوده نشد");
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "فصل با موفقیت افزوده شد"
                },
                errors: null
            })

        } catch (error) {
            next(error);
        }
    }
    async chaptersOfCourse(req,res,next){
        try {
            const {courseID} = req.params;
            const course = await this.getChaptersOfCourse(courseID);
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    course
                },
                errors: null
            })

        } catch (error) {
            next(error);
        }
    }
    async removeChapterById(req,res,next){
        try {
            const {chapterID} = req.params;
            await this.getOneChapter(chapterID);
            const removeChapterResult = await CourseModel.updateOne({"chapters._id":chapterID},
            {
                $pull: {
                    chapters: {_id:chapterID}
                }
            })
            if(removeChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("حذف با موفقیت انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "فصل با موفقیت حذف شد"
                },
                errors: null
            })

        } catch (error) {
            next(error);
        }
    }
    async updateChapterById(req,res,next){
        try {
            const {chapterID} = req.params;
            await this.getOneChapter(chapterID);
            const data = req.body;
            deleteInvalidPropertyInObject(data,["_id"])
            const updateChapterResult = await CourseModel.updateOne(
                {"chapters._id":chapterID},
                {$set: { "chapters.$": data}}
            )
            if(updateChapterResult.modifiedCount == 0) throw createHttpError.InternalServerError("بروزرسانی با موفقیت انجام نشد")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "فصل با موفقیت بروزرسانی شد"
                },
                errors: null
            })

        } catch (error) {
            next(error);
        }
    }
    async getChaptersOfCourse(id){
        const  chapters = await CourseModel.findOne({_id:id},{chapters: 1,title: 1});
        if(!chapters) throw createHttpError.NotFound("دوره ای یافت نشد");
        return chapters;
    }
    async getOneChapter(id){
        const chapter = await CourseModel.findOne({"chapters._id" : id},{"chapters.$":1 })
        if(!chapter) throw createHttpError.NotFound("فصلی یافت نشد");
        return chapter;
    }
} 

module.exports ={
    ChapaterController : new ChapaterController
}