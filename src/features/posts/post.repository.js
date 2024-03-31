import mongoose from "mongoose";
import PostSchema from "./post.schema.js";
import ApplicationError from "../../errorhandlers/application.errors.js";

const PostModel = mongoose.model("Post", PostSchema);

export default class PostRepository {
  async addPost(userId, postData) {
    try {
      const newPost = new PostModel({ user: userId, ...postData });
      await newPost.save();
      return newPost;
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            throw new ApplicationError("Post with the same user and image URL already exists.", 400);
        } else {
            console.error(error);
            throw new ApplicationError("Unable to post", 500);
        }
    }
  }
  async getAll(){
    try {
        return await PostModel.find({});
    } catch (error) {
        console.log(error);
throw new ApplicationError("Unable to retrieve post",400);
    }
  }
  async getUserPost(postId){
    try {
        const post = await PostModel.findById(postId);
        if(!post){
            throw new Error("post not found");
        }
        return post;
    } catch (error) {
        console.log(error);
        throw new  ApplicationError("Unable to retrieve post",400)
    }
  }
  async getPosts(userId){
    try {
        const user = await PostModel.find({user:userId});
        if(!user|| user.length===0){
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.log(error);
        throw new ApplicationError("Unable to retrieve the post",400)
    }
  }
  async updatePost(postId,userId,postData){
    try {
       const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId, user: userId }, // Criteria to find the post
        postData, // Data to update
        { new: true, runValidators: true } // Options: return the modified document and run validators
    );

    if (!updatedPost) {
        throw new ApplicationError("Post not found or you don't have permission to update it", 404);
    }

    return updatedPost;
    } catch (error) {
        console.log(error);
        throw new ApplicationError("Unable to update the post",400);
    }
  }
  async removePost(postId){
    try {
        const deletedPost = await PostModel.findByIdAndDelete(postId);
        if (!deletedPost) {
            throw new ApplicationError("Post not found", 404);
        }
    } catch (error) {
        console.log(error);
        throw new ApplicationError("Unable to delete the post",400);
    }
  }
}
