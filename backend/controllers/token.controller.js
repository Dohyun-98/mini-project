import { PhoneService } from "./services/phone.js";
import { Tokens } from "../models/token.model.js";

export class TokenController {
  authenticationRequest = async (req, res) => {
    const phoneService = new PhoneService();
    const phone = req.body.phone;

    // 휴대폰 번호 유효성 검사
    if (!phoneService.isValidPhone(phone)) {
      res.send("유효하지 않은 휴대폰번호").status(200);
      return;
    }
    // 토큰 생성
    const token = phoneService.makeToken(phone);

    // 토큰 휴대폰 전송
    //await phoneService.sendTokenSMS(phone, token);

    // 휴대폰 번호 조회
    const hasToken = await Tokens.findOneAndUpdate({ phone }, { token });
    if (hasToken) {
      res.send("핸드폰으로 인증문자가 전송되었습니다!").status(200);
    } else if (!hasToken) {
      const tokenDB = new Tokens({
        phone,
        token,
      });
      await tokenDB.save();
      res.send("핸드폰으로 인증문자가 전송되었습니다!").status(200);
    }
  };

  completedVerification = async (req, res) => {
    const { phone, token } = req.body;

    const hasPhone = await Tokens.findOne({ phone });

    if (!hasPhone) {
      // 휴대폰 번호가 존재하지 않을 때
      res.send(false);
      return;
    }
    if (hasPhone.token !== token) {
      // 토큰 번호가 동일하지 않을 때
      res.send(false);
    } else if (hasPhone.token === token) {
      // 토큰 번호가 동일할 때
      await Tokens.findOneAndUpdate({ phone }, { isAuth: true });
      res.send(true);
    }
  };

  deleteToken = async (req, res) => {
    const phone = req.body.phone;
    await Tokens.deleteOne({ phone }, (err) => {
      if (err) console.log(err);
    });
    res.send("delete success").status(200);
  };
}
