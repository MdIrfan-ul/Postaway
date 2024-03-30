import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: {
    type: String,
    unique: [true, "Email is required"],
    match: [
      /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    validate: {
      validator: function (v) {
        // Check if password length is greater than or equal to 8
        return v.length >= 8;
      },
      message: (props) =>
        `Password length should be greater than or equal to 8 characters!`,
    },
  },
  gender: String,
  avatar: String,
  loggedIn: { type: Boolean, default: false },
  loginTokens: [String],
});

export default UserSchema;
