import LikeModel from "../models/likes.model.js";

export default class LikesController {
    // Add Likes using postId
    addLikes(req, res, next) {
        try {
            const postId = req.params.id;
            const userId = req.userId;
            const newLike = LikeModel.toggle(userId, Number(postId));
            res.status(201).json(newLike);
        } catch (error) {
            next(error);
        }
    }
    // Get All likes using postId
    getAllLikes(req, res, next) {
        try {
            const postId = req.params.id;
            const likes = LikeModel.get(postId);
            res.status(200).json(likes);
        } catch (error) {
            next(error);
        }
    }
}
