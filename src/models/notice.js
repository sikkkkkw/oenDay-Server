import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  writer: String,
  createdAt: Date,
  updatedAt: Date,
});

const Notice = mongoose.model("Notice", noticeSchema);
export default Notice;
