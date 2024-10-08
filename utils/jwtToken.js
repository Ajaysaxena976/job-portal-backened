
export const sendToken=(user,statusCode,res,message)=>{
    const token=user.getJWTToken();
    const options={
        expires:new Date(
            Date.now()+process.env.COOKIE_EXPIRE *24*60*60*1000
        ),
        //this is because we are working only on http
        httpOnly:true,
        secure:true,
        sameSite:"None",
    }
    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        message,
        token,
    })
}