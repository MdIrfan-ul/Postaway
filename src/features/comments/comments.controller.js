import CommentsRepository from "./comments.repository.js";
import { errorLogger } from "../../middlewares/logger.middleware.js";

export default class CommentsController{
    constructor(){
        this.commentsRepository = new CommentsRepository();
    }
    async getComments(req,res){
        try {
            const postId = req.params.postId;
            const comments = await this.commentsRepository.get(postId);
            res.status(200).send(comments);
        } catch (error) {
            errorLogger.error(error.message);
            console.log(error);
            res.status(error.code).send(error.message);
        }
    }
    async addComments(req,res){
        try {
            const userId = req.userId;
            const postId = req.params.postId;
            const comments = req.body.content;
            const newComment = await this.commentsRepository.addComments(userId,postId,comments);
            res.status(201).send({msg:"Comments Added Successfully",comments:newComment});
        } catch (error) {
            errorLogger.error(error.message);
            console.log(error);
            res.status(error.code).send(error.message);
        }
    }
    async updateComments(req,res){
        try {
            const userId = req.userId;
            const commentId = req.params.commentId;
            const comment = req.body.content;
           const updatedComment =  await this.commentsRepository.updateComments(userId,commentId,comment);
           res.status(200).send({msg:"Comments Added Successfully",comments:updatedComment });
        } catch (error) {
            errorLogger.error(error.message);
            console.log(error);
            res.status(error.code).send(error.message);
        }
    }

    async deleteComments(req,res){
        try {
            const userId = req.userId;
            const commentId = req.params.commentId;
            await this.commentsRepository.deleteComments(userId,commentId);
            res.status(200).send("Comments Deleted Successfully");
        } catch (error) {
            errorLogger.error(error.message);
            console.log(error);
            res.status(error.code).send(error.message);
        }
    }
}