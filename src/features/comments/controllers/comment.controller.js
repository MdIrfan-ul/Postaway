import CommentModel from "../models/comment.model.js";


export default class CommentController{
    getComments(req,res){
        const postId = req.params.id;
        try {
            const comments = CommentModel.get(postId);
            if (!comments || comments.length === 0) {
                res.status(404).send("No comments found for the specified post");
            } else {
                res.status(200).json(comments);
            }
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }
    addComments(req,res){
        const userId = req.userId;
        const postId = req.params.id;
        const {content} =req.body;
        try {
            const newComment = CommentModel.add(userId,postId,content);
            res.status(201).send("Comments Added to The Post");
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }

    updateComments(req,res,next){
        const id = req.params.id;
        const userId= req.userId;
        const {postId,content} =req.body;
        try {
            const updatedPost = CommentModel.update(id, userId, postId, content);
            if (!updatedPost) {
                res.status(404).send("Post not found");
            } else {
                res.status(200).json(updatedPost);
            }
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }
    deleteComments(req,res,next){
        const postId = req.params.id;
        const userId = req.userId;

        try {
            const deletedPost = CommentModel.remove(postId, userId);
            if (deletedPost) {
               return res.status(404).send("Post not found");
            } else {
               return res.status(200).send("Comment is Deleted");
            }
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }
}