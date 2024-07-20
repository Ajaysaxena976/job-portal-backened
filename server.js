import app from "./app.js";
import cloudinary from "cloudinary"

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
    api_key:process.env.CLOUDINARY_APIKEY,
    api_secret:process.env.CLOUDINARY_SECRETKEY
})
// console.log(process.env.FRONTEND_URL);
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on the port ${process.env.PORT}`);
})