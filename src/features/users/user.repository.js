import mongoose from "mongoose";
import UserSchema from "./user.schema.js";
import ApplicationError from "../../errorhandlers/application.errors.js";
import { ObjectId } from "mongodb";

const UserModel = mongoose.model("User", UserSchema);
export default class UserRepository {
  async register(userData) {
    try {
      const newUser = new UserModel(userData);
      return await newUser.save();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });
      // if (user) {
      //   user.loggedIn = true;
      //   await user.save();
      // }
      return user;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Invalid Credentials", 400);
    }
  }
  async login(email, token) {
    try {
      const user = await UserModel.findOneAndUpdate({ email },{$push:{loginTokens:token}},{new:true});
      if(user){
        user.loggedIn =true;
        await user.save();
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Invalid Credentials", 400);
    }
  }
  async logout(userId,token) {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
          throw new ApplicationError("User not found",404);
      }
      if (!user.loginTokens.includes(token)) {
        throw new Error("Invalid token");
    }

      // Remove the token from the loginTokens array
      user.loginTokens.pull(token);

      // If there are no more tokens left, set loggedIn to false
      if (user.loginTokens.length === 0) {
          user.loggedIn = false;
      }

      // Save the user document
      await user.save();
      
  } catch (error) {
      console.error(error);
      throw new ApplicationError("Unable to logout", 400);
  }
  }
  async logoutAll(userId) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
          throw new Error("User not found");
      }
      if(user.loginTokens.length>0){
        await UserModel.updateMany(
          { _id: new ObjectId(userId) },
          { $set: { loggedIn: false, loginTokens: [] } }
        );
      }else{
        throw new Error("no user found");
      }
      
    } catch (error) {
      console.error(error);
      throw new ApplicationError("Unable to logout from all devices", 400);
    }
  }
}
