import mongoose from "mongoose";
import OtpSchema from "./otp.Schema.js";
import ApplicationError from "../../errorhandlers/application.errors.js";
import UserSchema from "../users/user.schema.js";

const OtpModel = mongoose.model("Otp",OtpSchema);
const UserModel = mongoose.model("User",UserSchema);

export default class OtpRepository{
async sendOtp(userId,email){
    try {
        const user = await UserModel.findById(userId);
        
        // Check if the user exists and the email matches
        if (!user || user.email !== email) {
            throw new ApplicationError("Unauthorized to send OTP for this email", 403);
        }
        
        // const user = await UserModel.findOne({email});
        // if(!user){
        //     throw new ApplicationError("User not for the email",404);
        // }
        let otp = await OtpModel.findOne({ email });
        if (!otp) {
            // If no OTP exists for the email, generate a new one
            const generateOtp = Math.floor(100000 + Math.random() * 900000);
            otp = new OtpModel({ user:user,email: email, otp: generateOtp });
        } else {
            // If an OTP already exists, update it with a new one
            otp.otp = Math.floor(100000 + Math.random() * 900000);
        }
        await otp.save();
        return otp.otp;
    } catch (error) {
        if(error.code===403){
throw new ApplicationError(error.message,error.code);
        }
        console.log(error);
        throw new ApplicationError("Failed to send Otp",400)
    }
}
async verifyOtp(otp,email){
    try {
        const verifyEmail = await UserModel.findOne({email});
        if(!verifyEmail){
            throw new Error("Email is incorrect");
        }
        const verify =await OtpModel.findOne({otp:otp,email:email});
        if(!verify){
            throw new ApplicationError("Otp is incorrect",400);
        }
        return verify;

    } catch (error) {
        console.log(error);
        throw new ApplicationError(`Failed to verify otp ${error.message}`,400);
    }
}
async resetPassword(userId,hashedPassword)
{
    try {
        let user = await UserModel.findById(userId);
        if(!user){
            throw new Error("user not found");
        }
        user.password = hashedPassword;
        user.save();
    } catch (error) {
        console.log(error);
        throw new ApplicationError("failed to reset password",400);
    }
}
}