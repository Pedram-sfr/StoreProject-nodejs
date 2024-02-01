const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
const morgan = require("morgan");
const createError = require("http-errors");
const { create } = require("domain");
module.exports = class Appllication{
    #app = express()
    #DB_URI;
    #PORT;
    constructor(PORT,DB_URI){
        this.#DB_URI = DB_URI;
        this.#PORT = PORT;
        this.configApplication();
        this.connectedToMongoDb();
        this.createServer();
        this.createRoutes();
        this.errorHnadling();
    }
    configApplication(){
        this.#app.use(morgan("dev"))
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}))
        this.#app.use(express.static(path.join(__dirname,"..","public")))
    }
    createServer(){
        const http = require("http");
        http.createServer(this.#app).listen(this.#PORT,()=>{
            console.log("run > http://localhost:"+this.#PORT);
        })
    }
    connectedToMongoDb(){
        mongoose.connect(this.#DB_URI).then(() => {
            console.log("connected to DB");
        }).catch((err) => {
            console.log(err?.message ?? "Failed DB Connection");
        });
        mongoose.connection.on("connected",()=>{
            console.log("mongoose connected");
        });
        mongoose.connection.on("disconnected",()=>{
            console.log("mongoose connection is diconnected");
        })
        process.on("SIGINT", async()=>{
            await mongoose.connection.close();
            process.exit(0);
        })
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    errorHnadling(){
        this.#app.use((req,res,next)=>{
            next(createError.NotFound("آدرس مورد نظر یافت نشد."))
        })
        this.#app.use((error,req,res,next)=>{
            const serverError = createError.InternalServerError()
            const statusCode = error.status || serverError.statusCode;
            const message = error.message || serverError.message;
            return res.status(statusCode).json({
                data: null,
                errors:{
                    statusCode ,
                    message
                }
            })
        })
    }
}