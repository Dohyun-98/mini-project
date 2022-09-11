import express from "express";
import mongoose from "mongoose";
import { Coffee } from "./src/coffee.model.js";

const absolutePath = "/Users/kdh/Documents/mini-project/webcrawler";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.static(absolutePath + "/public"));
app.get("/", (req, res) => {
  const path = absolutePath + "/src/index.html";
  res.sendFile(path);
});

app.post("/save/coffee", async (req, res) => {
  let result = [];
  for (data of req.body) {
    const result = new Coffee({
      name: data.name,
      img: data.img,
    });
    await result.save().then((re) => {
      console.log(re);
      result.push(re);
    });
  }
  res.send(result);
});

mongoose.connect("mongodb://localhost:27017/starbucks");

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`listen to ${port}`);
});
