import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register=catchAsyncError(async(req,res,next)=>{
    const { name, email, phone, password, role } = req.body;
    if (!name || !email || !phone || !password || !role) {
      return next(new ErrorHandler("Please fill full form!"));
    }
    const isEmail=await User.findOne({email});
    if(isEmail){
        return next(new ErrorHandler("Email already exist"))
    }
    //Now email not in the database so we can create new user
    const user=await User.create({
        name,email,phone,role,password,
    })
    // res.status(200).json({
    //     success:true,
    //     message:"user registered",
    //     user,  //sending full user with the response
    // })
    sendToken(user,200,res,"User registered successfully");
});
export const login=catchAsyncError(async(req,res,next)=>{
    const {email,password,role}=req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Enter all the details",400));
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid credentials",400));
    }
    const isPasswordMatch=await user.comparePassword(password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid credentials",400));
    }
    if(user.role!==role){
        return next(new ErrorHandler("User with this role is not available",400));
    }
    //everything is correct so generate the token and store in cookie
    sendToken(user,200,res,"User Logged In Successfully");
})
export const logout=catchAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now()),
        secure:true,
        sameSite:"None",
    })
    .json({
        success:true,
        message:"User logged out successfully"
    })
});
export const getUser=catchAsyncError((req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    })
})
