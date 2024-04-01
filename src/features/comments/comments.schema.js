import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    User:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    Post:{type:mongoose.Schema.Types.ObjectId,ref:'post'},
    comment:{type:String,required:[true,"Comment is Required"]}

});


export default CommentSchema;