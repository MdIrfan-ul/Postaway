import mongoose from "mongoose";

const LikeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likeable: { type: mongoose.Schema.Types.ObjectId, refPath: "model" },
  model: { type: String, enum: ["Post", "Comment"] },
});

export default LikeSchema;
