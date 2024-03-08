import express from "express";
import LikesController from "../controllers/likes.controller.js";


const likeRoutes  = express.Router();

const likesController = new LikesController();
likeRoutes.post("/:id",likesController.addLikes);
likeRoutes.get("/:id",likesController.getAllLikes);


export default likeRoutes;