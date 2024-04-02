import mongoose from "mongoose";
import LikeSchema from "./likes.schema.js";
import PostSchema from "../posts/post.schema.js";
import CommentSchema from "../comments/comments.schema.js";
import ApplicationError from "../../errorhandlers/application.errors.js";
import { ObjectId } from "mongodb";

const LikeModel = mongoose.model("Like", LikeSchema);
const PostModel = mongoose.model("Post", PostSchema);
const CommentModel = mongoose.model("Comment", CommentSchema);
export default class LikeRepository {
  async getLikes(id, type) {
    try {
      const like = await LikeModel.findById(id);
      //   console.log(id);
      //   console.log(type);
      if (!like) {
        throw new ApplicationError("like not found", 404);
      }

      if (type !== "Post" && type !== "Comment") {
        throw new Error("Invalid likeableType");
      }
      const likes = await LikeModel.find({
        _id: id,
        model: type,
      }).populate([
        { path: "user", select: "id email name gender " },
        { path: "likeable", select: "-_id -User -Post -__v", model: type },
      ]);

      return likes;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("no likes found for the Given Id", 400);
    }
  }
  async toggleLike(userId, id, on_model) {
    try {
      if (on_model === "Post") {
        const post = await PostModel.findById(id);
        if (!post) {
          throw new ApplicationError("no such post found", 404);
        }
      } else if (on_model === "Comment") {
        const comment = await CommentModel.findById(id);
        if (!comment) {
          throw new ApplicationError("no such comment found", 404);
        }
      } else {
        throw new Error("Invalid on_model value");
      }

      const deletedLike = await LikeModel.findOneAndDelete({
        user: userId,
        likeable: id,
        model: on_model,
      }).populate([
        { path: "user", select: "id email name gender" },
        { path: "likeable", select: "-_id -__v", model: on_model },
      ]);

      if (deletedLike) {
        return {
          success: true,
          res: deletedLike,
          likeStatus: "unliked",
        };
      }

      const newLike = new LikeModel({
        user: userId,
        likeable: id,
        model: on_model,
      });

      await newLike.populate([
        { path: "user", select: "id email name gender" },
        { path: "likeable", select: "-_id -__v", model: on_model },
      ]);

      await newLike.save();

      return {
        success: true,
        res: newLike,
        likeStatus: "liked",
      };
    } catch (error) {
      if (error.code === 404) {
        throw new ApplicationError(error.message, error.code);
      }
      console.error(error);
      throw new ApplicationError(
        `Failed to toggle like: ${error.message}`,
        400
      );
    }
  }
  async getById(id) {
    try {
      const like = await LikeModel.findById(id);
      if (!like) {
        throw new Error("like not found");
      }
      return like.model;
    } catch (error) {
      console.error(error);
      throw new ApplicationError("Failed to get likes", 400);
    }
  }
}
