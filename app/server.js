const express = require("express");
const { default: mongoose } = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const createError = require("http-errors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");
const expressEjsLayouts = require("express-ejs-layouts")
require("dotenv").config();
const { AllRoutes } = require("./router/router");
const { initialSocket } = require("./utils/initSocket");
const { socketHandler } = require("./socket.io");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { COOKIE_PARSER_SECRET_KEY } = require("./utils/constans");
const { clientHelper } = require("./utils/client");
module.exports = class Appllication{
    #app = express()
    #DB_URI;
    #PORT;
    constructor(PORT,DB_URI){
        this.#DB_URI = DB_URI;
        this.#PORT = PORT;
        this.configApplication();
        this.initTemplateEngine();
        this.initClientSession();
        this.connectedToMongoDb();
        this.initRedis();
        this.createServer();
        this.createRoutes();
        this.errorHnadling();
    }
    configApplication(){
        this.#app.use(cors());
        this.#app.use(morgan("dev"))
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}))
        this.#app.use(express.static(path.join(__dirname,"..","public")))
        this.#app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition: {
                openapi: "3.0.0",
                info: {
                    title: "Pedram Local Test Store",
                    version: "1.0.0",
                    description: "نمونه پروژه بک اند با nodejs"
                },
                servers: [
                    {
                        url: "http://localhost:"+this.#PORT
                    }
                ],
                components:{
                    securitySchemes:{
                        BearerAuth:{
                            type: "http",
                            scheme:"bearer",
                            bearerFormat: "JWT"
                        }
                    }
                },
                security:[{BearerAuth : []}]
            },
            apis:["./app/router/**/*.swagger.js"]
        }),{
            explorer: true
        }
        ))
    }
    createServer(){
        const http = require("http");
        const server = http.createServer(this.#app);
        const io = initialSocket(server);
        socketHandler(io)
        server.listen(this.#PORT,()=>{
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
    initRedis(){
        require("./utils/initRedis")
    }
    initTemplateEngine(){
        this.#app.use(expressEjsLayouts);
        this.#app.set("view engine","ejs")
        this.#app.set("views","resource/views")
        this.#app.set("layout extractStyles",true)
        this.#app.set("layout extractScripts",true)
        this.#app.set("layout","./layouts/master")
        this.#app.use((req,res,next)=>{
            this.#app.locals = clientHelper(req,res);
            next();
        })
    }
    initClientSession(){
        this.#app.use(cookieParser(COOKIE_PARSER_SECRET_KEY));
        this.#app.use(session({
            secret: COOKIE_PARSER_SECRET_KEY,
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: true
            }
        }))
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