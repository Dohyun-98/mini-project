import express from "express";
import mongoose from "mongoose";
import { Coffee } from "./src/coffee.model.js";
import { crawler } from "./src/index.js";

const absolutePath = "/Users/kdh/Documents/mini-project/webcrawler";

const port = 8080;
const app = express();

app.use(express.json());
app.use(express.static(absolutePath + "/public"));
app.get("/", (req, res) => {
  const path = absolutePath + "/src/index.html";
  res.sendFile(path);
});

app.get("/save/coffee", async (req, res) => {
  const list = await crawler();
  const nameList = list[0];
  const imgList = list[1];
  let coffeeObj = [];
  for (let i = 0; i < 10; i++) {
    const result = new Coffee({
      name: nameList[i],
      img: imgList[i],
    });
    await result
      .save()
      .then((re) => {
        coffeeObj.push(re);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  console.log(coffeeObj);
  res.send(coffeeObj);
});

mongoose.connect("mongodb://localhost:27017/User");

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`listen to ${port}`);
});
