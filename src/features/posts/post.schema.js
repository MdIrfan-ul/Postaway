import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,
    ref:"User"},
    imageUrl:{type:String,required:[true,"imageUrl is required to Add a Post"]},
    caption:{type:String,required:[true,"caption is required to Add a Post"]}
});

PostSchema.index({ user: 1, imageUrl: 1 }, { unique: true });
export default PostSchema;