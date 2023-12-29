import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter you're name"],
  },
  email: {
    type: String,
    required: [true, "please enter you're email"],
  },
  password: {
    type: String,
    required: [true, "please enter you're password"],
  },
  cratedAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
