import LikeModel from "../models/likes.model.js";



export default class LikesController{
    addLikes(req,res,next){
        const postId = req.params.id;
        const userId = req.userId;
        const newLike = LikeModel.toggle(userId,postId);
        if(!newLike){
            res.status(400).status("No Likes for this post")
        }else{

            res.status(201).json(newLike);
        }

    }
    getAllLikes(req,res,next){
        const postId = req.params.id;
        const likes = LikeModel.get(postId);
            if (likes && likes.length>0) {
                res.status(200).json(likes);
            } else {
                res.status(404).send("No likes found for the specified post");
            }
    }
}