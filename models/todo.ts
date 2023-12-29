import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "enter title"],
  },
  description: {
    type: String,
    required: [true, "enter description"],
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  cratedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
