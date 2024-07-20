import mongoose from "mongoose";
import {User} from "./userSchema.js"
const jobSchema=new  mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide job title"],
        minLength:[3,"Job title length should not be less than 3"],
        maxLength:[50,"Title cannot exceed 50 characters"],
    },
    description:{
        type:String,
        required:[true,"Please provide job description"],
        minLength:[3,"Job Description length should not be less than 3"],
        maxLength:[350,"Description cannot exceed 350 characters"],
    },
    category:{
        type:String,
        required:[true,"Please provide job category"],
        minLength:[3,"Job category length should not be less than 3"],
        maxLength:[50,"Category cannot exceed 50 characters"],
    },
    country:{
        type:String,
        required:[true,"Please provide country"],
    },
    city:{
        type:String,
        required:[true,"Please provide the city"],
    },
    location:{
        type:String,
        required:[true,"Please provide exact location"],
        minLength:[20,"Job location should be above 50 characters"]
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"Salary can't be below 4 places"],
        maxLength:[9,"Salary can't exceed 9 places"],
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"Salary from can't be below 4 places"],
        maxLength:[9,"Salary from can't exceed 9 places"],
    },
    salaryTo:{
        type:Number,
        minLength:[4,"Salary to can't be below 4 places"],
        maxLength:[9,"Salary to can't exceed 9 places"],
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now(),
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required:true,
    }
});
export const Job=mongoose.model("Job",jobSchema);