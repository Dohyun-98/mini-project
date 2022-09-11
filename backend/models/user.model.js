import mongoose from "mongoose";

const userModel = mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  prefer: String,
  pwd: String,
  phone: String,
  og: {
    title: String,
    description: String,
    image: String,
  },
});

export const User = mongoose.model("User", userModel);
