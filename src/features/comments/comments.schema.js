import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    Post:{type:mongoose.Schema.Types.ObjectId,ref:'Post'},
    comment:{type:String,required:[true,"Comment is Required"]}

});


export default CommentSchema;