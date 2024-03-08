import UserModel from "../../users/models/user.models.js";

export default class CommentModel{
    constructor(id,userId,postId,content){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }
    static get(postId){
        const getComments = comments.filter(comment=> comment.postId == postId);
        return getComments
    }
    static add(userId,postId,content){
        let newComment = new CommentModel(comments.length+1,userId,postId,content);
        comments.push(newComment);
        return newComment;
    }
    static update(id,userId,postId,content){
        let index = comments.findIndex(comment=>comment.id ==id && comment.postId == postId );
        if(index==-1){
            return "Post not found"
        }else{
           let updateComment = new CommentModel(id,userId,postId,content);
           return comments[index]=updateComment;
        }
    }
    static remove(postId,userId){
        const index = comments.findIndex(comment=>comment.id == postId&& comment.userId==userId);
        if(index==-1){
            return "comments not found for the post";
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