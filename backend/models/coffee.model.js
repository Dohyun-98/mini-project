import mongoose from "mongoose";

const coffeeModel = mongoose.Schema({
  name: String,
  img: String,
});

export const Coffee = mongoose.model("Coffee", coffeeModel);
