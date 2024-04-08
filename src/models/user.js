import mongoose from "mongoose";
// 왜 안될까요
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },

  profileImage: String,
  password: String,
  createdAt: Date,
  updatedAt: Date,
});

const User = mongoose.model("User", userSchema);
export default User;
