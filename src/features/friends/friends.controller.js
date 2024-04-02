import FriendRepository from "./friends.repository.js";

export default class FriendsController {
  constructor() {
    this.friendRepository = new FriendRepository();
  }
  async getUserFriend(req, res) {
    try {
        const userId = req.params.userId;
        const userFriend = await this.friendRepository.getUserFriend(userId);
        res.status(200).json({friends:userFriend});
    } catch (error) {
      console.log(error);
      res.status(error.code).send(error.message);
    }
  }
  async getPendingReq(req, res) {
    try {
        const pendingRequests = await this.friendRepository.getPendingRequest();
            res.status(200).json({ pendingRequests });
    } catch (error) {
      console.log(error);
      res.status(error.code).send(error.message);
    }
  }
  async toggleFriendship(req, res) {
    try {
        const userId =req.userId;
        const friendId = req.params.friendId;
        const friendship = await this.friendRepository.toggleFriendship(userId,friendId);
        console.log(friendship);
        res.status(200).send(friendship);
    } catch (error) {
      console.log(error);
      res.status(error.code).send(error.message);
    }
  }
  async responseToRequest(req,res){
    try {
            const userId = req.userId;
            const {friendId} = req.params;
            const {accept} = req.query;
            console.log(accept)
            const response = await this.friendRepository.respondToRequest(userId,friendId,accept);
            res.status(200).send(response);

    } catch (error) {
        console.log(error);
        res.status(error.code).send(error.message); 
    }
  }
}
