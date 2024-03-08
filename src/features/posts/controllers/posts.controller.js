import PostModel from "../models/post.model.js";

export default class PostController {
  // Get All Posts
  getPosts(req, res, next) {
    let posts = PostModel.getAll();
    res.status(200).send(posts);
  }
  // Create Post
  createPost(req, res, next) {
    const userId = req.userId;
    const { caption } = req.body;
    const imageUrl = req.file.filename
    let newPost = PostModel.add(userId, caption, imageUrl);
    res.status(201).send(newPost);
  }
  // Get Specific Post by Id
  getSpecificPost(req, res, next) {
    const id = req.params.id;
    let specificPost = PostModel.getById(id);
    if (specificPost) {
      res.status(200).send(specificPost);
    } else {
      res.status(404).send("Post not found");
    }
  }
  // Get UserPost By UserId
  getUserPost(req, res, next) {
    const userId = req.userId;
    let userPost = PostModel.getUserPost(userId);
    res.status(200).send(userPost);
  }
  // Update Post By Id
  updatePost(req, res) {
    const id = req.params.id;
    const userId = req.userId;
    const { caption, imageUrl } = req.body;
    try {
      const updatedPost = PostModel.update(id, userId, caption, imageUrl);
      if (!updatedPost) {
        res.status(404).send("Post not found");
      } else {
        res.status(200).json(updatedPost);
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
  // Delete Post By Id
  deletePost(req, res) {
    const postId = req.params.id;
    const userId = req.userId;
    try {
      const deletedPost = PostModel.remove(postId, userId);
      if (deletedPost) {
        return res.status(404).send("Post not found");
      } else {
        return res.status(200).send("Post is Deleted");
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
}
