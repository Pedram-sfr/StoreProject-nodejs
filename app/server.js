const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const { AllRoutes } = require("./router/router");
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
    }
    createRoutes(){
        this.#app.use(AllRoutes)
    }
    errorHnadling(){
        this.#app.use((req,res,next)=>{
            return res.status(404).json({
                statusCode: 404,
                message: "آدرس مورد نظر یافت نشد."
            })
        })
        this.#app.use((error,req,res,next)=>{
            const statusCode = error.status || 500;
            const message = error.message || "InternalServerError";
            return res.status(statusCode).json({
                statusCode ,
                message
            })
        })
    }
}