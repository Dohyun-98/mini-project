import express from "express";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swagger/config.js";
import cors from "cors";
import "dotenv/config";
import { UserController } from "./controllers/user.controller.js";
import { TokenController } from "./controllers/token.controller.js";
import { StarbucksController } from "./controllers/starbucks.controller.js";

// express port : 80
const port = 80;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

// Controller
const userController = new UserController();
const tokenController = new TokenController();
const starbucksController = new StarbucksController();

// User API
app.post("/user", userController.signUp);
app.get("/users", userController.getUsers);

// Token API
app.post("/tokens/phone", tokenController.authenticationRequest);
app.patch("/tokens/phone", tokenController.completedVerification);
app.post("/tokens/delete", tokenController.deleteToken);

// Starbucks API
app.get("/starbucks", starbucksController.getCoffees);

mongoose.connect("mongodb://DataBase:27017/User");

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`listen to ${port}`);
});
