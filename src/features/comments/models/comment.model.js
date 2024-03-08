import UserModel from "../../users/models/user.models.js";
import ApplicationError from "../../../middlewares/application.error.middleware.js";
import PostModel from "../../posts/models/post.model.js";
export default class CommentModel{
    constructor(id,userId,postId,content){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }
    static get(postId){
        const getComments = comments.filter(comment=> comment.postId == postId);
        if(getComments.length===0){
            throw new ApplicationError("No comments for this specific post",404);
        }

        return getComments;
        
    }
    static add(userId,postId,content){
        const post = PostModel.getAll().find(post=>post.id ==postId);
        if(!post){
            throw new ApplicationError("post is not found",400);
        };
        if(!content){
            throw new ApplicationError("Content for the post is not present",400);
        }
        let newComment = new CommentModel(comments.length+1,userId,postId,content);
        comments.push(newComment);
        return newComment;
    }
    static update(id,userId,postId,content){
        const post = PostModel.getAll().find(post => post.id == postId);
        if (!post) {
            throw new ApplicationError("Post not found", 404);
        }
    
        // Find the index of the comment to update
        const index = comments.findIndex(comment => comment.id == id && comment.postId == postId);
        if (index === -1) {
            throw new ApplicationError("Comment not found", 404);
        }
    
        // Check if the user is authorized to update the comment
        if (comments[index].userId !== userId) {
            throw new ApplicationError("You are not authorized to update this comment", 403);
        }
    
        // Validate content
        if (!content) {
            throw new ApplicationError("Content is required for updating the comment", 400);
        }
    
        // Update the comment
        comments[index].content = content;
        return comments[index];
    }
    static remove(postId,userId){
        const index = comments.findIndex(comment=>comment.id == postId&& comment.userId==userId);
        if(index==-1){
            throw new ApplicationError("comments not found for the post",404);
        }else{
            comments.splice(index,1);
        }
    }
}


var comments = [
    { id: 1, userId: 1, postId: 1, content: "Comment 1" },
    { id: 2, userId: 2, postId: 1, content: "Comment 2" },
    { id: 3, userId: 1, postId: 2, content: "Comment 3" },
    { id: 4, userId: 2, postId: 2, content: "Comment 4" }
]