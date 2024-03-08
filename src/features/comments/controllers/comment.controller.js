import CommentModel from "../models/comment.model.js";


export default class CommentController{
    getComments(req,res,next){
        const postId = req.params.id;
        try {
            const comments = CommentModel.get(postId);
            res.status(200).json(comments);
        } catch (error) {
            next(error); // Pass the error to the error handling middleware
        }
    }
    addComments(req,res,next){
        const userId = req.userId;
        const postId = req.params.id;
        const {content} =req.body;
        try {
            const newComment = CommentModel.add(userId,Number(postId),content);
            res.status(201).send("Comments Added to The Post");
        } catch (error) {
            next(error);
        }
    }

    updateComments(req,res,next){
        const id = req.params.id;
        const userId= req.userId;
        const {postId,content} =req.body;
        try {
            const updatedPost = CommentModel.update(Number(id), userId, Number(postId), content);
            res.status(200).json(updatedPost);
        } catch (error) {
        next(error)
        }
    }
    deleteComments(req,res,next){
        const postId = req.params.id;
        const userId = req.userId;

        try {
            CommentModel.remove(postId, userId);
            return res.status(200).send("Comment is Deleted");
        } catch (error) {
next(error);
        }
    }
}