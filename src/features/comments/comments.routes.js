import express from "express";
import CommentsController from "./comments.controller.js";

const CommentsRoutes = express.Router();
const  commentsController = new CommentsController();

CommentsRoutes.get("/:postId",(req,res)=>{
    commentsController.getComments(req,res);
});
CommentsRoutes.post("/:postId",(req,res)=>{
    commentsController.addComments(req,res);
});
CommentsRoutes.put("/:commentId",(req,res)=>{
    commentsController.updateComments(req,res);
});
CommentsRoutes.delete("/:commentId",(req,res)=>{
    commentsController.deleteComments(req,res);
});


export default CommentsRoutes;