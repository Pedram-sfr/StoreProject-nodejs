const { createCourseSchema } = require("../../../validators/admin/course.schema")
const {StatusCodes: HttpStatus} = require("http-status-codes");
const Controller = require("../../controller");
const { CourseModel } = require("../../../../model/course");
const path = require("path");
const createHttpError = require("http-errors");
const { default: mongoose } = require("mongoose");
const {copyObject, deleteInvalidPropertyInObject, deleteFileInPublic, getCourseTime} = require("../../../../utils/functions")

class CourseController extends Controller{
    async getListOfCourse(req,res,next){
        try {
            const {search} = req.query;
            let courses;
            if(search)
                courses = await CourseModel.find({$text: {$search: search}})
            .populate([
                {path: "category",select: {children: 0,parent:0}},
                {path: "teacher",select: {first_name: 1,last_name:1,mobile:1,email:1}}])
            .sort({_id: -1});
            else 
            courses = await CourseModel.find({})
            .populate([
                {path: "category",select: {children: 0,parent:0}},
                {path: "teacher",select: {first_name: 1,last_name:1,phone:1,email:1}}])
            .sort({_id: -1});
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data:{
                    courses
                },
                errors: null
            })
        } catch (error) {
            next(error);
        }
    }
    async addCourse(req,res,next){
        try {
            await createCourseSchema.validateAsync(req.body)
            const {fileUploadPath,filename} = req.body
            const image = path.join(fileUploadPath,filename).replace(/\\/ig,"/");
            const {title,text,short_text,tags,category,price,discount,type} = req.body;
            if(Number(price) > 0 && type == "free") throw createHttpError.BadRequest("برای دوره رایگان نمیتوان قیمت ثبت کرد")
            const course = await CourseModel.create({title,text,short_text,tags,category,price,discount,type,image,
                status: "notStarted",
                teacher: req.user._id
            });
            if(!course) throw createHttpError.InternalServerError("خطای سرور")
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "دوره با موفقیت ایجاد شد"
                },
                errors: null
            })
        } catch (error) {
            next(error);
        }
    }
    async updateCourseById(req,res,next){
        try {
            const {id} = req.params;
            const course = await this.findCourseById(id);
            const data = copyObject(req.body);
            const {filename,fileUploadPath} = req.body
            let blackList = ["time","chapters","episodes","students","comments","likes","dislikes","bookmarks","filename","fileUploadPath"];
            deleteInvalidPropertyInObject(data,blackList);
            if(req.file){
                deleteFileInPublic(course.image)
                data.image = path.join(fileUploadPath,filename).replace(/\\/g,"/");
            }
            const updateCourseResualt = await CourseModel.updateOne({_id:id},{
                $set: data
            })
            if(!updateCourseResualt.modifiedCount) throw createHttpError.InternalServerError("خطای سرور")
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "دوره با موفقیت ویراش بافت"
                },
                errors: null
            })
        } catch (error) {
            next(error);
        }
    }
    async getCourseByID(req,res,next){
        try {
            const {id} = req.params;
            const course = await CourseModel.findById(id);
            if(!course) throw createHttpError.NotFound("دوره ای یافت نشد");
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
    async findCourseById(id){
        if(!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("شناسه صحیح نمیباشد");
        const course = await CourseModel.findById(id);
        if(!course) throw createHttpError.NotFound("دوره ای یافت نشد");
        return course;
    }

}

module.exports ={
    CourseController : new CourseController
}