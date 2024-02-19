const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { getTime, deleteInvalidPropertyInObject, copyObject } = require("../../../../utils/functions");
const { CourseModel } = require("../../../../model/course");
const createHttpError = require("http-errors");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { ObjectIdValidator } = require("../../../validators/public.validator");
class EpisodeController extends Controller{
    async addNewEpisode(req,res,next){
        try {
            const {title,text,type,chapterID,courseID,fileUploadPath,filename} = await createEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath,filename).replace(/\\/g, "/");
            const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`
            const seconds = await getVideoDurationInSeconds(videoUrl);
            const time = getTime(seconds);
            const episode= {
                title,text,type,chapterID,courseID,videoAddress,time
            } 
            const creatEpisodeResault = await CourseModel.updateOne({_id: courseID,"chapters._id": chapterID},{
                $push:{
                    "chapters.$.episodes" : episode
                }
            });
            if(creatEpisodeResault.modifiedCount == 0)
                throw createHttpError.InternalServerError("افزودن اپیزود انجام نشد")
            return res.status(HttpStatus.CREATED).json({
                StatusCodes: HttpStatus.CREATED,
                data:{
                    message: "اپیزود با موفقیت افزوده شد"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async updateEpisode(req,res,next){
        try {
            const {id: episodeID} = await ObjectIdValidator.validateAsync({id: req.params.episodeID});
            const episode = await this.getOneEpisode(episodeID);
            const {fileUploadPath,filename} = req.body;
            let blackList=["_id"];
            if(fileUploadPath && filename){
                req.body.videoAddress = path.join(fileUploadPath,filename).replace(/\\/g, "/");
                const videoUrl = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${req.body.videoAddress}`
                const seconds = await getVideoDurationInSeconds(videoUrl);
                req.body.time = getTime(seconds);
                blackList.push=["filename"];
                blackList.push=["fileUploadPath"];
            }else{
                blackList.push=["time"];
                blackList.push=["videoAddress"];
            }
            const data = req.body;
            deleteInvalidPropertyInObject(data,blackList);
            const editEpisodeResault = await CourseModel.updateOne({"chapters.episodes._id": episodeID},{
                $set:{
                    "chapters.$.episodes" : {...episode,...data}
                }
            });
            if(!editEpisodeResault.modifiedCount)
                throw createHttpError.InternalServerError("ویرایش اپیزود انجام نشد")
            return res.status(HttpStatus.OK).json({
                StatusCodes: HttpStatus.OK,
                data:{
                    message: "اپیزود با موفقیت ویرایش شد"
                },
                errors: null
            })
        } catch (error) {
            next(error)
        }
    }
    async removeEpisode(req,res,next){
        try {
            const {id: episodeID} = await ObjectIdValidator.validateAsync({id: req.params.episodeID});
            await this.getOneEpisode(episodeID);
            const removeEpisodeResault = await CourseModel.updateOne(
            {
                "chapters.episodes._id": episodeID
            },
            {
                $pull:{
                    "chapters.$.episodes" : {
                        _id: episodeID
                    }
                }
            });
            if(removeEpisodeResault.modifiedCount == 0)
                throw createHttpError.InternalServerError("حذف اپیزود انجام نشد")
            return res.status(HttpStatus.OK).json({
                StatusCodes: HttpStatus.OK,
                data:{
                    message: "اپیزود با موفقیت حذف شد"
                },
                errors: null
            })
        } catch (error) {
            next(error )
        }
    }
    async getOneEpisode(episodeId){
        const course = await CourseModel.findOne({"chapters.episodes._id":episodeId});
        if(!course) throw createHttpError.NotFound("اپیزود یافت نشد");
        const episode = await course?.chapters?.[0]?.episodes?.[0];
        if(!episode) throw createHttpError.NotFound("اپیزود یافت نشد");
        return copyObject(episode);
    }
}

module.exports = {
    EpisodeController : new EpisodeController
}