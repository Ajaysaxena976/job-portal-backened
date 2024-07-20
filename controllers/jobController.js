import {catchAsyncError} from "../middlewares/catchAsyncError.js"
import ErrorHandler from "../middlewares/error.js"
import {Job} from "../models/jobSchema.js"
import { User } from "../models/userSchema.js";
export const getAllJobs=catchAsyncError(async(req,res,next)=>{
    const jobs=await Job.find({expired:false});
    res.status(200).json({
        success:true,
        jobs, 
    })
})
export const postJob=catchAsyncError(async(req,res,next)=>{
    //first we will fetch the user which is posting the job through the help of req.user
    //but how the user is available in the req.user , because we have not added yet
    //this will be possible becuaswe in the route of postJob we first add the middleware 
    //of isAuthorized and when this runs then at the end it adds the user into the req.user
     const {role}=req.user;
    //  console.log(req.user);
    console.log(role);
    if(role==="Job Seeker"){
        return next(new ErrorHandler("You are not the Employer",400));
    }
    const {title,description,category,country,location,city,fixedSalary,salaryFrom,salaryTo}=req.body;
    if(!title|| !description || !category || !country || !location || !city){
        return next(new ErrorHandler("Please provide all the details regarding job"),400);
    }
    if((!salaryFrom || !salaryTo) && !fixedSalary){
        return next(new ErrorHandler("Please provide either the fixed salry or ranged salary"));
    }
    if(salaryFrom && salaryTo && fixedSalary){
        return next(new ErrorHandler("Please provide only one either the fixed salary or ranged salary but not both"));
    }
    const postedBy=req.user._id;
    // console.log(postedBy);
    const job=await Job.create({
        title,description,category,country,location,city,fixedSalary,salaryFrom,salaryTo,postedBy
    })
    res.status(200).json({
        success:true,
        message:"Job posted successfully",
        job
    })
})
export const getMyJobs = catchAsyncError(async (req, res, next) => {
    // console.log("Come here")
    const { role } = req.user;
    // console.log("User Role:", role); // Log user role for debugging
    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
    }
    
    try {
        const myjobs = await Job.find({ postedBy: req.user._id });
        res.status(200).json({
            success: true,
            myjobs,
        });
    } catch (error) {
        // console.error("Error fetching jobs:", error); // Log error for debugging
        return next(new ErrorHandler(error.message || "Failed to fetch jobs", 500));
    }
});
export const updateJob=catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const {id}=req.params;
    let job=await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Job does not exist",404));
    }
    job=await Job.findByIdAndUpdate(id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success:true,
        job,
        message:"Job updated successfully"
    })
});
export const deleteJob=catchAsyncError(async(req,res,next)=>{
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const {id}=req.params;
    const job=await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Job does not exist",404));
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"Job deleted successfully",
        job,
    })
})
export const getSingleJob=catchAsyncError(async(req,res,next)=>{
    const {id}=req.params;
    try{
        const job=await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Job Not found",404));
        }
        res.status(200).json({
            success:true,
            job
        })
    }
    catch(error){
        return next(new ErrorHandler("Invalid Id/ Cast Error",400))
    }
})