import mongoose from "mongoose";
import UserSchema from "./user.schema.js";
import ApplicationError from "../../errorhandlers/application.errors.js";

const UserModel = mongoose.model("User",UserSchema);
export default class UserRepository{
async register(userData){
try {
    const newUser = new UserModel(userData);
    return await newUser.save();
} catch (error) {
    console.log(error);
    throw error
}
}
async login(email){
    try {
        return await UserModel.findOne({email});
    } catch (error) {
        console.log(error);
        throw new ApplicationError("Invalid Credentials",400);
    }
}
}