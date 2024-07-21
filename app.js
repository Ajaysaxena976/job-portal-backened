import express from "express";
import dotenv from "dotenv";
import cors from "cors" //connect the frontend and backend
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js"
import jobRouter from "./routes/jobRouter.js"
import applicationRouter from "./routes/applicationRouter.js"
import { dbConnection } from "./database/dbConnection.js";
import {ErrorMiddleware} from "./middlewares/error.js";
const app=express();
dotenv.config({path:"./config/config.env"});

app.use(cors({
    //For single frontend use the origin as
    // origint:process.env.FRONTEND_URL,  
    //For multiple frontend use the array
    origin:"https://jobportalfrontend-1-0zvc.onrender.com",
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))

app.use("/api/v1/user",userRouter);
app.use("/api/v1/application",applicationRouter);
app.use("/api/v1/job",jobRouter);

dbConnection();

app.use(ErrorMiddleware);
export default app;
