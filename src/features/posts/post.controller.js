import { errorLogger } from "../../middlewares/logger.middleware.js";
import PostRepository from "./post.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }
  async addPost(req, res) {
    try {
      const userId = req.userId;
      let { image, caption } = req.body;
      // If file is uploaded, set image from req.file
      if (req.file) {
        image = req.file.filename;
      }
      const postData = { image, caption };
      await this.postRepository.addPost(userId, postData);
      res.status(201).send("post added Successfully");
    } catch (error) {
      errorLogger.error(error.message);
      res.status(error.code).send(error.message);
    }
  }
  async allPost(req, res) {
    try {
      const posts = await this.postRepository.getAll();
      res.status(200).send(posts);
    } catch (error) {
      errorLogger.error(error.message);
      console.log(error);
      res.status(error.code).send(error.message);
    }
  }
  async userPost(req, res) {
    try {
      const postId = req.params.postId;
      const post = await this.postRepository.getUserPost(postId);
      res.status(200).send(post);
    } catch (error) {
      errorLogger.error(error.message);
      console.log(error);
      res.status(error.code).send(error.message);
    }
  }
  async getPost(req, res) {
    try {
      const userId = req.userId;
      const post = await this.postRepository.getPosts(userId);
      res.status(200).send(post);
    } catch (error) {
      errorLogger.error(error.message);
      console.log(error);
      res.status(error.code).send(error.message);
    }
  }
  async deletePost(req, res) {
    try {
      const postId = req.params.postId;
      const userId = req.userId;

      const post = await this.postRepository.getUserPost(postId);
      if (!post) {
        throw new Error("post not found");
      }
      if (post.user.toString() !== userId) {
        throw new Error("Unauthorized: You do not have permission to delete this post", 403);
    }
      await this.postRepository.removePost(postId);
      res.status(200).send("Post Deleted Successfully");
    } catch (error) {
      errorLogger.error(error.message);
      console.log(error);
      res.status(error.code).send(error.message);
    }
  }
  async updatePost(req,res){
    try {
        const postId = req.params.postId;
        const userId = req.userId;
        let { caption,image} = req.body; // Extract caption from req.body
        

        // Check if file is uploaded and set image accordingly
        if (req.file) {
            image = req.file.filename;
        }

        const postData = { caption, image }; // Create postData object
        const updatedPost = await this.postRepository.updatePost(postId, userId, postData); // Pass postData to updatePost method
        res.status(200).send(updatedPost);
    }  catch (error) {
      errorLogger.error(error.message);
        console.log(error);
        res.status(error.code).send(error.message);
    }
  }
}
