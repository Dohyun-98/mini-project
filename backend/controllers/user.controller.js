import { getOgTag } from "./services/webscraping.js";
import { filterPersonal, getDate } from "./services/util.js";
import { EmailService } from "./services/email.js";
import { User } from "../models/user.model.js";
import { Tokens } from "../models/token.model.js";

export class UserController {
  getUsers = async (req, res) => {
    const userList = await User.find();
    if (userList.length === 0) {
      res.send("데이터가 존재하지 않습니다.").status(200);
    } else {
      res.send(userList).status(200);
    }
  };

  signUp = async (req, res) => {
    const emailService = new EmailService();
    const { name, email, phone, pwd, prefer } = req.body;
    let personal = req.body.personal;
    const og = await getOgTag(prefer);
    personal = filterPersonal(personal);

    const isUser = await User.findOne({ phone });
    if (isUser) {
      // 이미 회원정보가 존재할 때
      res.send("이미 회원가입이 되어 있습니다.").status(200);
      return;
    }
    const isPhone = await Tokens.findOne({ phone });
    if (!isPhone) {
      // 번호가 존재하지 않을 때
      res.send("에러!! 핸드폰 번호가 인증되지 않았습니다.").status(422);
      return;
    }
    if (!isPhone.isAuth) {
      // isAuth의 값이 false 일때
      res.send("에러!! 핸드폰 번호가 인증되지 않았습니다.").status(422);
      return;
    }
    if (isPhone.isAuth) {
      //isAuth의 값이 true 일때
      const user = new User({
        name,
        email,
        personal,
        pwd,
        phone,
        og,
      });
      await user.save();
      const mailForm = emailService.makeEmailForm(
        { name, phone, prefer },
        getDate()
      );
      await emailService.sendMail(email, mailForm);
      res.send(isPhone._id).status(200);
    }
  };
}
