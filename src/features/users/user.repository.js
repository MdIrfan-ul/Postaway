import mongoose from "mongoose";
import UserSchema from "./user.schema.js";
import ApplicationError from "../../errorhandlers/application.errors.js";
import { ObjectId } from "mongodb";
import fs from "fs";

const UserModel = mongoose.model("User", UserSchema);
export default class UserRepository {
  async register(userData) {
    try {
      const newUser = new UserModel(userData);
      return await newUser.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "User is Already Registered Login to Continue",
        400
      );
    }
  }
  async findByEmail(email) {
    try {
      const user = await UserModel.findOne({ email });

      return user;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Invalid Credentials", 400);
    }
  }
  async login(email, token) {
    try {
      const user = await UserModel.findOneAndUpdate(
        { email },
        { $push: { loginTokens: token } },
        { new: true }
      );
      if (user) {
        user.loggedIn = true;
        await user.save();
      }
      return user;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Invalid Credentials", 400);
    }
  }
  async logout(userId, token) {
    try {
      const user = await UserModel.findById(userId);

      if (!user) {
        throw new ApplicationError("User not found", 404);
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
      if (user.loginTokens.length > 0) {
        await UserModel.updateMany(
          { _id: new ObjectId(userId) },
          { $set: { loggedIn: false, loginTokens: [] } }
        );
      } else {
        throw new Error("no user found");
      }
    } catch (error) {
      console.error(error);
      throw new ApplicationError("Unable to logout from all devices", 400);
    }
  }
  async getUser(userId) {
    try {
      const user = await UserModel.findById(userId).select(
        "-password -loggedIn -loginTokens "
      );
      if (!user) {
        throw new Error("user not found");
      }
      return user;
    } catch (error) {
      console.error(error);
      throw new ApplicationError("Unable to get user", 400);
    }
  }
  async getAllUser() {
    try {
      return await UserModel.find({}).select(
        "-password -loggedIn -loginTokens"
      );
    } catch (error) {
      console.error(error);
      throw new ApplicationError("Unable to get all users", 400);
    }
  }
  async updateUser(userId, userData) {
    try {
      const existingUser = await UserModel.findById(userId);

      if (!existingUser) {
        throw new Error("User not found");
      }

      // Check if the submitted data is identical to the existing user data
     // Update user fields
     existingUser.name = userData.name || existingUser.name;
     existingUser.email = userData.email || existingUser.email;
     existingUser.gender = userData.gender || existingUser.gender;

     // If avatar data is provided, update it
     if (userData.avatar) {
       existingUser.avatar = userData.avatar;
     }

      
       // Save the updated user
       const updatedUser = await existingUser.save();
       console.log(updatedUser);

       return updatedUser;
    } catch (error) {
      console.error(error);
      throw new ApplicationError("Updation failed", 400);
    }
  }
}
