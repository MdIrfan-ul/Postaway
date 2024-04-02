import mongoose from "mongoose";
import FriendsSchema from "./friends.Schema.js";
import ApplicationError from "../../errorhandlers/application.errors.js";
import UserSchema from "../users/user.schema.js";

const FriendshipModel = mongoose.model("Friends",FriendsSchema);
const UserModel = mongoose.model("User",UserSchema);
export default class FriendRepository{
    async getUserFriend(userId){
        try {
            const friendships = await FriendshipModel.find({ user: userId, status: 'accepted' }).populate({ path: 'friend', select: "user name gender email" });
            if (friendships.length === 0) {
                throw new ApplicationError("No friends found for the user", 404);
            }
            return friendships.map(friendship => friendship.friend);
        } catch (error) {
            if (error.code === 404) {
                throw new ApplicationError(error.message, error.code);
            }
            console.error(error);
            throw new ApplicationError("Failed to fetch friends for the user", 500);
        }
    }
    async getPendingRequest(){
        try {
            const pendingRequests = await FriendshipModel.find({ status: 'pending' }).populate([{path:'user',select:"name email gender"},{path:"friend",select:"name email gender"}])
            return pendingRequests;
        } catch (error) {
            console.log(error);
    throw new ApplicationError("Failed to fetch pending friend requests",400);
        }
    }
    async toggleFriendship(userId,friendId){
        try {
            if (userId === friendId) {
                throw new ApplicationError("Cannot send a friend request to yourself", 400);
            }
            const friendExists = await UserModel.exists({ _id: friendId });
            if (!friendExists) {
                throw new ApplicationError("Friend does not exist", 404);
            }
            
            const existingFriendship = await FriendshipModel.findOne({ user: userId, friend: friendId });
            // console.log("existingFriendship:",existingFriendship);
            if (existingFriendship) {
                await FriendshipModel.findOneAndDelete({user:userId,friend:friendId});
                return { message: 'Friendship removed' };
            } else {
                const newFriendship = new FriendshipModel({ user: userId, friend: friendId, status: 'pending' });
                await newFriendship.save();
                return { message: 'Friendship request sent' };
            }
        } catch (error) {
            console.log(error);
            throw new ApplicationError(`Failed to toggle friendship status ${error.message}`,400)
        }
    }
    async respondToRequest(userId, friendId, accept) {
        try {
            const friendship = await FriendshipModel.findOne({ user: friendId, friend: userId, status: 'pending' });

            // Check if the friendship request exists
            if (!friendship) {
                throw new ApplicationError("no pending friend request found", 404);
            }
    console.log(accept);
            // Update the status based on the user's response
            if(accept ==="accepted"){

                friendship.status = 'accepted' ;
              
            }else{
               
                friendship.status = 'rejected';
            }

            await friendship.save();
    
            // Return a success message
            return { message: `Friendship request ${friendship.status}` };
        } catch (error) {
            if(error.code===404){
                throw new ApplicationError(error.message,error.code);
            }
            console.log(error);
            throw new ApplicationError("Failed to respond to friendship request",400);
        }
    }

}