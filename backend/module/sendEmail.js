require("dotenv").config();
const nodemailer = require("nodemailer");

// 이메일 보내기 모듈 세팅
const transporter = nodemailer.createTransport({
  service: "naver",
  host: "smtp.naver.com", // SMTP 서버명
  port: 465, // SMTP 포트
  auth: {
    user: process.env.NODEMAILER_USER, // 네이버 아이디
    pass: process.env.NODEMAILER_PASS, // 네이버 비밀번호
  },
});
// 이메일 보내기 모듈

const emailSend = (email, token) => {
  const emailOptions = {
    // 옵션값 설정
    from: process.env.NODEMAILER_USER,
    to: email,
    subject: "바로네일 인증 메일입니다.",
    html: `네이버 ${token}테스트입니다.`,
  };
  transporter.sendMail(emailOptions);
};

module.exports = emailSend;
