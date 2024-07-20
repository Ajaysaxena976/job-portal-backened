class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}
export const ErrorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error";
    err.statusCode=err.statusCode || 500;
    if(err.name==="CastErrors"){
        const message=`Resources not found Invalid path ${err.path}`
        err=new ErrorHandler(message,400);
    }
    if(err.code===11000){  //This error occurs in mongodb when the duplicate email is given to register
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err=new ErrorHandler(message,400);
    }
    if(err.message==="JsonWebTokenError"){
        const message=`Json web token is invalid try again`
        err=new ErrorHandler(message,400);
    }
    if(err.message==="TokenExpiredError"){
        const message=`Json web token is expired try again`
        err=new ErrorHandler(message,400);
    }
    return res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
}
export default ErrorHandler;