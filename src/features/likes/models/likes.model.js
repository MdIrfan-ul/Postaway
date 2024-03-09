import PostModel from "../../posts/models/post.model.js";
import ApplicationError from "../../../middlewares/application.error.middleware.js";

export default class LikeModel {
    constructor(id, userId, postId) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }
    // Toggle Like Feature
    static toggle(userId, postId) {
        // Check if the postId exists in the posts collection
        const existingPost = PostModel.getAll().find((post) => post.id == postId);
        if (!existingPost) {
            throw new ApplicationError("Post not found for the given Id", 404);
        }

        const existingLikeIndex = likes.findIndex(
            (like) => like.userId == userId && like.postId == postId
        );

        if (existingLikeIndex !== -1) {
            // If like exists, remove it
            likes.splice(existingLikeIndex, 1);
            return { liked: false };
        } else {
            // If like doesn't exist, add it
            const newId = likes.length > 0 ? likes[likes.length - 1].id + 1 : 1;
            const newLike = new LikeModel(newId, userId, postId);
            likes.push(newLike);
            return { liked: true };
        }
    }
    //   Get the likes by PostId
    static get(postId) {
        const like = likes.filter((like) => like.postId == postId);
        if (like.length === 0) {
            throw new ApplicationError("No likes found for the specified post", 404);
        }
        return like;
    }
}

var likes = [];
