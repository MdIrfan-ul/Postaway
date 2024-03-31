import express from "express";

import PostController from "./post.controller.js";
import { postUpload } from "../../middlewares/file-upload.middleware.js";

const PostRoutes = express.Router();
const postController = new PostController();

PostRoutes.post("/", postUpload.single("imageUrl"), (req, res) => {
  postController.addPost(req, res);
});
PostRoutes.get("/all", (req, res) => {
  postController.allPost(req, res);
});
PostRoutes.get("/:postId", (req, res) => {
  postController.userPost(req, res);
});
PostRoutes.get("/", (req, res) => {
  postController.getPost(req, res);
});
PostRoutes.delete("/:postId", (req, res) => {
  postController.deletePost(req, res);
});
PostRoutes.put("/:postId", postUpload.single("imageUrl"),(req, res) => {
  postController.updatePost(req, res);
});
export default PostRoutes;
