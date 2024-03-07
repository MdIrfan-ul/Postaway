import express from "express";
import PostController from "../controllers/posts.controller.js";
const postRoutes = express.Router();

const postController = new PostController();

postRoutes.get("/all", postController.getPosts);
postRoutes.post("/", postController.createPost);
postRoutes.get("/:id", postController.getSpecificPost);
postRoutes.put("/:id", postController.updatePost);
postRoutes.delete("/:id", postController.deletePost);
postRoutes.get("/", postController.getUserPost);

export default postRoutes;
