import express from "express";

import PostController from "../controllers/posts.controller.js";
import { uploadFile } from "../../../middlewares/file-upload.middleware.js";
import { addValidationMiddleware } from "../../../middlewares/validation.middleware.js";
const postRoutes = express.Router();

const postController = new PostController();

postRoutes.get("/all", postController.getPosts);
postRoutes.post("/",uploadFile.single('imageUrl'),addValidationMiddleware,postController.createPost);
postRoutes.get("/:id", postController.getSpecificPost);
postRoutes.put("/:id", uploadFile.single('imageUrl'),addValidationMiddleware,postController.updatePost);
postRoutes.delete("/:id", postController.deletePost);
postRoutes.get("/", postController.getUserPost);

export default postRoutes;
