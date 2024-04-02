import OtpRepository from "./otp.repository.js";
import { errorLogger } from "../../middlewares/logger.middleware.js";
import bcrypt from "bcrypt";

export default class OtpController{
    constructor(){
        this.otpRepository = new OtpRepository();
        // this.userRepository = new UserRepository();
    }
    async sendOtp(req,res){
        try {
            const userId = req.userId;
            const email = req.body.email;
            const otp = await this.otpRepository.sendOtp(userId,email);
            res.status(200).json({ otp: otp, message: "OTP sent successfully" });
        } catch (error) {
            errorLogger.error(error.message);
            console.log(error);
            res.status(error.code).send(error.message);
        }
    }
    async verifyOtp(req,res){
        try {
            const {otp,email} = req.body;
            const verify = await this.otpRepository.verifyOtp(otp,email);
            res.status(200).json({verfication:verify,message:"Otp verified successfully"})
        } catch (error) {
            errorLogger.error(error.message);
            console.log(error);
            res.status(error.code).send(error.message);
        }
    }
    async resetPassword(req,res){
        try {
            const {password} =req.body;
            const hashedPassword = await bcrypt.hash(password,10);
            const userId=req.userId;
            await this.otpRepository.resetPassword(userId,hashedPassword);
            res.status(200).send("Password updated successfully");

        } catch (error) {
            errorLogger.error(error.message);
            console.log(error);
            res.status(error.code).send(error.message);
        }
    }
}