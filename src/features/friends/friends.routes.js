import express from "express";
import FriendsController from "./friends.controller.js";

const FriendsRoutes = express.Router();

const friendsController = new FriendsController();

FriendsRoutes.get("/get-friends/:userId",(req,res)=>{
    friendsController.getUserFriend(req,res);
});

FriendsRoutes.get("/get-pending-requests",(req,res)=>{
    friendsController.getPendingReq(req,res);
});
FriendsRoutes.get("/toggle-friendship/:friendId",(req,res)=>{
    friendsController.toggleFriendship(req,res);
});
FriendsRoutes.get("/response-to-request/:friendId",(req,res)=>{
    friendsController.responseToRequest(req,res);
});

export default FriendsRoutes;