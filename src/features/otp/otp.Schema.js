import mongoose from "mongoose";

const OtpSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
    ref:'User'},
    email:{type:String,ref:"User",required:[true,"email is required for send otp"]},
    otp:{type:Number,required:true}
});


export default OtpSchema;