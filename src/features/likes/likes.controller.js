import LikeRepository from "./likes.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async getLikes(req, res) {
    try {
      const { id } = req.params;
      const types = await this.likeRepository.getById(id);
      const likes = await this.likeRepository.getLikes(id, types);
      // console.log(likeCount)
      const likeCount = likes.length;
      res.status(200).json({ likeCount, likedBy: likes });
    } catch (error) {
      console.log(error);
      res.status(error.code).send(error.message);
    }
  }

  async toggleLike(req, res) {
    try {
      const id = req.params.id;
      const user = req.userId;
      const on_model = req.query.type;
      const resp = await this.likeRepository.toggleLike(user, id, on_model);
      res.status(200).send(resp);
    } catch (error) {
      console.log(error);
      res.status(error.code).send(error.message);
    }
  }
}
