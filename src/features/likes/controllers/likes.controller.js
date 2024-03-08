import LikeModel from "../models/likes.model.js";



export default class LikesController{
    addLikes(req,res,next){
        const postId = req.params.id;
        const userId = req.userId;
        const newLike = LikeModel.toggle(userId,postId);
        res.status(201).send(newLike);

    }
    getAllLikes(req,res,next){
        const postId = req.params.id;
        try {
            const likes = LikeModel.get(postId);
            if (!likes || likes.length === 0) {
                res.status(404).send("No likes found for the specified post");
            } else {
                res.status(200).json(likes);
            }
        } catch (error) {
            res.status(500).send("Internal Server Error");
        }
    }
}