import express from "express";
import LikeController from "./likes.controller.js";

const LikeRoutes = express.Router();
const likeController = new LikeController();

LikeRoutes.get("/:id", (req, res) => {
  likeController.getLikes(req, res);
});

LikeRoutes.get("/toggle/:id", (req, res) => {
  likeController.toggleLike(req, res);
});

export default LikeRoutes;
