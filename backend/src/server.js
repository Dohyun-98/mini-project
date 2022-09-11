import express from "express";
import mongoose from "mongoose";
import { Tokens } from "../models/token.model.js";
import { User } from "../models/user.model.js";
import { filterPersonal } from "./util.js";
import { getOgTag } from "./webscraping.js";
import { isValidPhone, makeToken, sendTokenSMS } from "./phone.js";
import cors from "cors";
import "dotenv/config";
import { Coffee } from "../models/coffee.model.js";
// express port : 80
const port = 80;
const app = express();
app.use(express.json());
app.use(cors());
//회원가입 API
// post-/user
app.post("/user", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const noFilterPersonal = req.body.personal;
  const phone = req.body.phone;
  const pwd = req.body.pwd;
  const prefer = req.body.prefer;
  const og = await getOgTag(prefer);
  const personal = filterPersonal(noFilterPersonal);
  const search = await Tokens.find({ phone }).catch(() => {
    res.send("서버 내부 오류").status(500);
  });
  if (search <= 0) {
    // 번호가 존재하지 않을 때
    res.send("에러!! 핸드폰 번호가 인증되지 않았습니다.").status(422);
  } else {
    if (search[0].isAuth == true) {
      const user = new User({
        name,
        email,
        personal,
        pwd,
        phone,
        og,
      });
      await user.save();
      res.send(search[0]._id).status(200);
    } else {
      res.send("에러!! 핸드폰 번호가 인증되지 않았습니다.").status(422);
    }
  }
});

//--------------------------------------------------
//회원 목록 조회
// get-/users
app.get("/users", async (req, res) => {
  const userList = await User.find().catch((err) => {
    if (err) console.log(err);
    res.send("서버 내부 오류").status(500);
  });
  console.log(userList.length);
  if (userList.length <= 0) {
    res.send("데이터가 존재하지 않습니다.").status(200);
  }
  res.send(userList).status(200);
});
//--------------------------------------------------
//토큰 인증 요청
//post-/tokens/phone
app.post("/tokens/phone", async (req, res) => {
  const phone = req.body.phone;
  console.log(phone);
  if (!isValidPhone(phone)) {
    console.log("유효하지 않은 번호입니다.");
    res.send("유효하지 않은 휴대폰번호").status(200);
    return;
  }
  const token = makeToken(phone);
  console.log(token);
  // await sendTokenSMS(phone, token);
  const search = await Tokens.findOneAndUpdate({ phone }, { token })
    .then((result) => {
      return result;
    })
    .catch(() => {
      return false;
    });
  console.log(search);
  if (!search) {
    const Token = new Tokens({
      phone,
      token,
    });
    await Token.save()
      .then(() => {
        res.send("핸드폰으로 인증문자가 전송되었습니다!").status(200);
      })
      .catch((err) => {
        console.log(err);
        res.send("서버 내부 오류").status(500);
      });
  } else {
    res.send("핸드폰으로 인증문자가 전송되었습니다!").status(200);
  }
});
//--------------------------------------------------
//토큰 인증 완료
//patch-/tokens/phone
app.patch("/tokens/phone", async (req, res) => {
  const phone = req.body.phone;
  const token = req.body.token;
  if (!isValidPhone(phone)) {
    res.send("휴대폰번호가 유효하지 않습니다.").status(200);
    return;
  }
  const search = await Tokens.find({ phone }).catch((err) => {
    res.send("서버 내부 오류").status(500);
  });
  console.log(search);

  if (search.length <= 0) {
    res.send(false).status(200);
  } else if (search[0].token !== token || token === undefined) {
    res.send(false).status(200);
  } else if (search[0].token === token) {
    await Tokens.findOneAndUpdate({ phone }, { isAuth: true }).then(() => {
      res.send(true).status(200);
    });
  }
});
//--------------------------------------------------
//스타벅스 커피 목록 조회
//get-/starbucks
app.get("/starbucks", async (req, res) => {
  const coffeeList = await Coffee.find().catch((err) => {
    if (err) console.log(err);
    res.send("서버 내부 오류").status(500);
  });
  if (coffeeList.length <= 0) {
    res.send("데이터가 존재하지 않습니다.").status(500);
  } else {
    res.send(coffeeList).status(200);
  }
});
//--------------------------------------------------
app.post("/tokens/delete", async (req, res) => {
  const phone = req.body.phone;
  console.log(phone);
  await Tokens.deleteOne({ phone }, (err) => {
    if (err) console.log(err);
  })
    .then((result) => {
      console.log(result);
      return;
    })
    .catch((err) => {
      if (err) console.log(err);
      res.send("서버 내부 오류").status(500);
    });
});
//--------------------------------------------------

mongoose.connect("mongodb://DataBase:27017/User");

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`listen to ${port}`);
});
