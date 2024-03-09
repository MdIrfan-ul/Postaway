import ApplicationError from "../../../middlewares/application.error.middleware.js";
import UserModel from "../../users/models/user.models.js";

export default class PostModel {
  constructor(id, userId, caption, imageUrl) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
    this.savedBy = [];
    this.archived = false;
    this.bookmarkedBy = [];
  }
  static getAll() {
    return posts;
  }
  static add(userId, caption, imageUrl) {
    let newPosts = new PostModel(posts.length + 1, userId, caption, imageUrl);
    posts.push(newPosts);
    return newPosts;
  }
  static getById(id) {
    let post = posts.find((post) => post.id == id);
    if (!post) {
      throw new ApplicationError("Post not found for the given Id", 400);
    }
    return post;
  }
  static getUserPost(userId) {
    return posts.filter((user) => user.userId == userId);
  }
  static update(id, userId, caption, imageUrl) {
    const index = posts.findIndex((i) => i.id == id && i.userId == userId);
    if (index == -1) {
      throw new ApplicationError(
        "you are not authorized to update this post",
        403
      );
    } else {
      let updatedPost = new PostModel(id, userId, caption, imageUrl);
      return (posts[index] = updatedPost);
    }
  }
  static remove(postId, userId) {
    const index = posts.findIndex((i) => i.id == postId && i.userId == userId);
    if (index == -1) {
      throw new ApplicationError(
        "you are not authorized  to delete this post",
        403
      );
    } else {
      posts.splice(index, 1);
    }
  }
  static getByCaption(caption) {
    console.log("Attempting to filter by caption:", caption);
    if (!caption.trim()) {
      throw new ApplicationError("Caption must be entered to filter.", 400);
    }

    const lowerCaseCaption = caption.toLowerCase(); // Convert the provided caption to lowercase
    const filteredPosts = posts.filter((post) =>
      post.caption.toLowerCase().includes(lowerCaseCaption)
    );

    if (filteredPosts.length === 0) {
      throw new ApplicationError(
        "No posts found with the provided caption.",
        400
      );
    }

    console.log("Filtered posts:", filteredPosts);
    return filteredPosts;
  }
  static save(postId, userId) {
    const post = posts.find((post) => post.id == postId);
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }

    // Check if the user already saved the post
    if (post.savedBy.includes(userId)) {
      throw new ApplicationError("Post already saved by the user", 400);
    }

    post.savedBy.push(userId);
  }
  static archivePost(postId) {
    const post = posts.find((post) => post.id == postId);
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }

    post.archived = true;
  }

  static bookMark(postId, userId) {
    const post = posts.find((post) => post.id == postId);
    if (!post) {
      throw new ApplicationError("Post not found", 404);
    }

    // Check if the user already bookmarked the post
    if (post.bookmarkedBy.includes(userId)) {
      throw new ApplicationError("Post already bookmarked by the user", 400);
    }

    post.bookmarkedBy.push(userId);
  }
}

var posts = [
  new PostModel(
    1,
    1,
    "Beautiful sunset",
    "https://t4.ftcdn.net/jpg/00/67/24/59/360_F_67245954_ejVa8C414CwJ9X0UadIFu1QEUjeLuFnO.jpg"
  ),
  new PostModel(
    2,
    2,
    "Delicious meal",
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=600"
  ),
];
