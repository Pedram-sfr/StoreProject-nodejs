const { createCourseSchema } = require("../../validators/admin/course.schema")
const {StatusCodes: HttpStatus} = require("http-status-codes");
const Controller = require("../controller");
const { CourseModel } = require("../../../model/course");
const path = require("path");
const createHttpError = require("http-errors");

class CourseController extends Controller{
    async getListOfCourse(req,res,next){
        try {
            const {search} = req.query;
            let courses;
            if(search)
                courses = await CourseModel.find({$text: {$search: search}}).sort({_id: -1});
            else 
            courses = await CourseModel.find({}).sort({_id: -1});
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
                time: "00:00:00",
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
    // async getListOfCourse(req,res,next){
    //     try {
            
    //     } catch (error) {
    //         next(error);
    //     }
    // }
    // async getListOfCourse(req,res,next){
    //     try {
            
    //     } catch (error) {
    //         next(error);
    //     }
    // }
    // async getListOfCourse(req,res,next){
    //     try {
            
    //     } catch (error) {
    //         next(error);
    //     }
    // }

}

module.exports ={
    CourseController : new CourseController
}