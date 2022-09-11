import mongoose from "mongoose";

const tokenModel = mongoose.Schema({
  token: String,
  phone: String,
  isAuth: { type: Boolean, default: false },
});

export const Tokens = mongoose.model("Tokens", tokenModel);
