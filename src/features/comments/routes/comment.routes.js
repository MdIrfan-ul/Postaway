import express from "express";
import CommentController from "../controllers/comment.controller.js";

const commentRoutes = express.Router();
const commentController = new CommentController();

commentRoutes.put("/:id",commentController.updateComments);
commentRoutes.get("/:id",commentController.getComments);
commentRoutes.post("/:id",commentController.addComments);
commentRoutes.delete("/:id",commentController.deleteComments);

commentRoutes.get("/pages/:id",commentController.paginationComments);



export default commentRoutes;