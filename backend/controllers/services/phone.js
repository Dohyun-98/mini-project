import coolsms from "coolsms-node-sdk";

export class PhoneService {
  // isVaildPhoneCheck : 휴대폰 번호 유효성 검증
  isValidPhone(phone) {
    const pattern = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (phone.match(pattern) === null) return false;
    else return true;
  }

  //makePhoneToken : 인증토큰 생성
  makeToken() {
    return String(Math.floor(Math.random() * 10 ** 6)).padStart(6, "0");
  }

  //sendTokenSMS : 휴대폰 번호로 인증토큰 전송
  async sendTokenSMS(phone, token) {
    const sms = coolsms.default;
    const text = `[코드캠프] 인증번호는 ${token}입니다.`;
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;
    const SMS_SENDER = process.env.SMS_SENDER;
    const messageService = new sms(SMS_KEY, SMS_SECRET);

    const result = await messageService
      .sendOne({
        to: phone,
        from: SMS_SENDER,
        text: text,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
