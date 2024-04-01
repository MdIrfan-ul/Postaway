import mongoose from "mongoose";
import CommentSchema from "./comments.schema.js";
import ApplicationError from "../../errorhandlers/application.errors.js"

const CommentsModel = mongoose.model("Comments",CommentSchema);

export default class CommentsRepository{
    async get(postId){
        try {
            const comments = await CommentsModel.find({ Post: postId }); // Corrected method name
            if (!comments || comments.length === 0) {
                throw new ApplicationError("Comments not found for the given post", 404); // Updated status code
            }
            return comments;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Failed to get Comments from the post",400);
        }
    }
    async addComments(userId,postId,comment){
        try {
            const existingComment = await CommentsModel.findOne({ User: userId, Post: postId, comment: comment });
        if (existingComment) {
            throw new ApplicationError("Duplicate comment found", 400); 
        }
            const newComment = new CommentsModel({User:userId,Post:postId,comment:comment});
            await newComment.save();
            return newComment;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Failed to Add Comments",400);
        }
    }
    async updateComments(userId,commentId,comment){
        try {
            const updatedComment = await CommentsModel.findOneAndUpdate({User:userId,_id:commentId},{comment:comment},{new:true});
            if (!updatedComment) {
                throw new ApplicationError("Comment not found or you don't have permission to update it", 404);
            }
            return updatedComment;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Failed to update Comments",400);
        }
    }
    async deleteComments(userId,commentId){
        try {
            const comment = await CommentsModel.findOneAndDelete({ User: userId, _id: commentId });
        if (!comment) {
            throw new ApplicationError("Comment not found or you don't have permission to delete it", 404);
        }
        return comment;
        } catch (error) {
            if(error.code ===404){
                throw new ApplicationError(error.message,error.code);
            }
            console.log(error);
            throw new ApplicationError("Failed to Delete Comment",400);
        }
    }
}