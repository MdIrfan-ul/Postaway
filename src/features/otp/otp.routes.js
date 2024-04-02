import express from "express";
import OtpController from "./otp.controller.js";


const OtpRoutes = express.Router();
const otpController = new OtpController();

OtpRoutes.post("/verify",(req,res)=>{
otpController.verifyOtp(req,res);
});
OtpRoutes.post("/send",(req,res)=>{
    otpController.sendOtp(req,res);

});
OtpRoutes.put("/reset-password",(req,res)=>{
otpController.resetPassword(req,res);
});

export default OtpRoutes;