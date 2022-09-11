import nodemailer from "nodemailer";

//isVaildEamilCheck : 이메일 유효성 검증
export function isValidEmailCheck({ email }) {
  const pattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (email.match(pattern) === null) return false;
  else return true;
}

export function makeEmailForm({ name, phone, prefer }, date) {
  return `
    <html>
        <body>
            <div style="width: 500px">
                <h1>${name}님 가입을 환영합니다!!!</h1>
                <br/>
                <hr />
                <div>이름: ${name}</div>
                <div>전화번호: ${phone}</div>
                <div>좋아하는 사이트: ${prefer}</div>
                <div>가입일: ${date}</div>
            </div>
        </body>
    </html>
    `;
}

//SendEmail - 이메일 전송
export async function sendMail({ email, mailForm }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    secure: true,
  });

  const mailOptions = {
    from: process.env.MAIL_SEDNER,
    to: email,
    subject: `${email}님 회원가입을 축하합니다.!`,
    html: mailForm,
  };

  const sendResult = await transporter.sendMail(mailOptions).catch((err) => {
    if (err) console.log(err);
  });

  console.log(sendResult);
  return "회원가입 이메일 전송완료";
}
