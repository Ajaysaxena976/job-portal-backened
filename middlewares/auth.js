import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
export const isAuthorized=catchAsyncError(async(req,res,next)=>{
    // console.log("Reached here")
    const {token}=req.cookies;//in cookies we will add the user info and access it using the
    //You could have saved teh user info in the cookie with the other name. So use the key 
    //with which you saved the data
    if(!token){
        return next(new ErrorHandler("User not authorized"));
    }
    // console.log("After if");
    //now we have the token whihc has user info but we need to compare it 
    //with the jwt token and ensure they both are the same
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    //adding the user into the req object
    req.user=await User.findById(decoded.id);
    // console.log(req.user._id)
    // console.log("Before next");
    next();
})