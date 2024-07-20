import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"MERN_JOB_APPLICATION"
    })
    .then(()=>{
        console.log("Connected to db");
    })
    .catch((err)=>{
        console.log(`Some error occured=> ${err}`);
    })
}