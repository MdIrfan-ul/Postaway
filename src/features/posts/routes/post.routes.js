import express from "express";

import PostController from "../controllers/posts.controller.js";
import { uploadFile } from "../../../middlewares/file-upload.middleware.js";
import { addValidationMiddleware } from "../../../middlewares/validation.middleware.js";

// PostRoutes

const postRoutes = express.Router();
const postController = new PostController();

// Additional Tasks
postRoutes.get("/filter", postController.filterPosts);
postRoutes.post("/:postId/save", postController.savePosts);
postRoutes.put("/:postId/archieve", postController.archivePost);
postRoutes.post("/:postId/bookmark", postController.bookmarkPost);

postRoutes.get("/all", postController.getPosts);
postRoutes.post(
  "/",
  uploadFile.single("imageUrl"),
  addValidationMiddleware,
  postController.createPost
);
postRoutes.get("/:id", postController.getSpecificPost);
postRoutes.put(
  "/:id",
  uploadFile.single("imageUrl"),
  addValidationMiddleware,
  postController.updatePost
);
postRoutes.delete("/:id", postController.deletePost);
postRoutes.get("/", postController.getUserPost);

export default postRoutes;
