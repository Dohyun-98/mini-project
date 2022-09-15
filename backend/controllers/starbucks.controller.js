import { Coffee } from "../models/coffee.model.js";

export class StarbucksController {
  getCoffees = async (req, res) => {
    const coffeeList = await Coffee.find();
    if (coffeeList.length === 0) {
      res.send("데이터가 존재하지 않습니다.").status(500);
    } else {
      res.send(coffeeList).status(200);
    }
  };
}
