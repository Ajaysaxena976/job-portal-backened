import mongoose from "mongoose";
import validator from "validator";

const applicationSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter the name"],
        minLength:[3,"Name should be greater than 3 characters"],
        maxLength:[50,"Name should not exceed 50 characters"],
    },
    email:{
        type:String,
        required:[true,"Please write the email"],
        validator:[validator.isEmail,"Please enter the valid email"],
    },
    coverLetter:{
        type:String,
        required:[true,"Please write the cover letter it is mandatory"],
    },
    phone:{
        type:Number,
        required:[true,"Please provide your contact number"],
    },
    address:{
        type:String,
        required:[true,"Please provide your address"],
    },
    //Resume will be stored and accessed throught the cloudinary
    resume:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            enum:["Job Seeker"],
        }
    },
    employerID:{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true,
        },
        role:{
            type:String,
            enum:["Employer"],
        }
    }
});
export const Application=mongoose.model("Application",applicationSchema);