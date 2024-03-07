import UserModel from "../../users/models/user.models.js";

export default class PostModel {
  constructor(id, userId, caption, imageUrl) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
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
    return posts.find((post) => post.id == id);
  }
  static getUserPost(userId){
    return posts.filter((user)=>user.userId == userId);
  }
  static update(id, userId, caption, imageUrl) {
    const index = posts.findIndex((i) => i.id == id && i.userId == userId);
    if (index == -1) {
      return "Post not Found";
    } else {
      let updatedPost = new PostModel(id, userId, caption, imageUrl);
      return (posts[index] = updatedPost);
    }
  }
  static remove(postId, userId) {
    const index = posts.findIndex((i) => i.id == postId && i.userId == userId);
    if (index == -1) {
      return "Post not found";
    } else {
      posts.splice(index, 1);
    }
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
