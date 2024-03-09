import ApplicationError from "../../../middlewares/application.error.middleware.js";
import PostModel from "../models/post.model.js";

export default class PostController {
  // Get All Posts
  getPosts(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const limit = parseInt(req.query.limit) || 10; // Default limit of 10 posts per page
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const posts = PostModel.getAll();
      const paginatedPosts = posts.slice(startIndex, endIndex);
      if(paginatedPosts.length ===0){
        throw new ApplicationError("No posts available for the specified page",404);
      }

      res.status(200).json({
        currentPage: page,
        totalPages: Math.ceil(posts.length / limit),
        posts: paginatedPosts
      });
    } catch (error) {
      next(error);
    }
  }
  // Create Post
  createPost(req, res, next) {
    const userId = req.userId;
    const { caption } = req.body;
    const imageUrl = req.file.filename;
    let newPost = PostModel.add(userId, caption, imageUrl);
    res.status(201).send(newPost);
  }
  // Get Specific Post by Id
  getSpecificPost(req, res, next) {
    try {
      const id = req.params.id;
      let specificPost = PostModel.getById(id);
      res.status(200).send(specificPost);
    } catch (error) {
      next(error);
    }
  }
  // Get UserPost By UserId
  getUserPost(req, res, next) {
    const userId = req.userId;
    let userPost = PostModel.getUserPost(userId);
    res.status(200).send(userPost);
  }
  // Update Post By Id
  updatePost(req, res, next) {
    const id = req.params.id;
    const userId = req.userId;
    const { caption, imageUrl } = req.body;
    try {
      const updatedPost = PostModel.update(id, userId, caption, imageUrl);
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }
  // Delete Post By Id
  deletePost(req, res, next) {
    const postId = req.params.id;
    const userId = req.userId;
    try {
      PostModel.remove(postId, userId);
      return res.status(200).send("Post is Deleted");
    } catch (error) {
      next(error);
    }
  }

  filterPosts(req, res, next) {
    try {
      const caption = req.query.caption;
      console.log("Filtering by caption:", caption);
      const filteredPosts = PostModel.getByCaption(caption);
      console.log("Filtered posts:", filteredPosts);
      res.status(200).json(filteredPosts);
    } catch (error) {
      next(error);
    }
  }

  savePosts(req, res, next) {
    const postId = req.params.postId;
    try {
      const userId = req.userId;
      PostModel.save(postId, userId);
      res.status(201).send("Post saved successfully");
    } catch (err) {
      next(err);
    }
  }

  archivePost(req, res, next) {
    const postId = req.params.postId;
    try {
      PostModel.archivePost(postId);
      res.status(201).send("Post archived successfully");
    } catch (error) {
      next(error);
    }
  }
  
  bookmarkPost(req,res,next){
    try {
      const postId =req.params.postId;
      const userId = req.userId;
      PostModel.bookMark(postId,userId);
      res.status(200).send("Post Bookmarked");
      
    } catch (error) {
      next(error)
    }
  }
}
