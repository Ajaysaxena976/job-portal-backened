import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name!"],
        minLength: [3, "Name must contain at least 3 Characters!"],
        maxLength: [30, "Name cannot exceed 30 Characters!"],
      },
      email: {
        type: String,
        required: [true, "Please enter your Email!"],
        validate: [validator.isEmail, "Please provide a valid Email!"],
      },
      phone: {
        type: Number,
        required: [true, "Please enter your Phone Number!"],
      },
      password: {
        type: String,
        required: [true, "Please provide a Password!"],
        minLength: [8, "Password must contain at least 8 characters!"],
        maxLength: [32, "Password cannot exceed 32 characters!"],
        select: false,
      },
      role: {
        type: String,
        required: [true, "Please select a role"],
        enum: ["Job Seeker", "Employer"],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});
//Now for encrypting or hashing thepasseord
// it is run automatically before saving the data to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
//Now suppose came to login and enter its password
//Now we have to check the equality between the actual
//password and the hashed password
//we will create the function userSchema.methods."our method name "
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generating the jwt token for authorization
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//now create the model 
export const User= mongoose.model("User",userSchema);   