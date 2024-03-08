import PostModel from "../../posts/models/post.model.js";

export default class LikeModel{
    constructor(id,userId,postId){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

    static toggle(userId,postId){
           // Check if the postId exists in the posts collection
        const existingPost = PostModel.getAll().find(post => post.id == postId);
        if (!existingPost) {
            return "Post not found";
        }

        const existingLikeIndex = likes.findIndex(like => like.userId == userId && like.postId == postId);

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
   static get(postId){
        return  likes.filter(like=>like.postId ==postId);
    }
}


var likes =[];