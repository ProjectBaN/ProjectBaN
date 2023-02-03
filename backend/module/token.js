require("dotenv").config();
const jwt = require("jsonwebtoken");

// 액세스토큰생성
const createAccessToken = (id, pw) => {
  return jwt.sign({ id: id, pw: pw }, process.env.JWT, {
    expiresIn: "1h",
  });
};
// 리프레시토큰생성
const createRefreshToken = (id, pw) => {
  return jwt.sign({ id: id, pw: pw }, process.env.JWT_REFRESH, {
    expiresIn: "14m",
  });
};
// 이메일인증토큰생성
const createEmailToken = (authHashNum, id) => {
  return jwt.sign({ authHashNum: authHashNum, id: id }, process.env.JWT, {
    expiresIn: "5m",
  });
};
// 임시토큰생성
const createTemporarilyAccessToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT, {
    expiresIn: "5m",
  });
};
// 액세스토큰 체크
const checkAccessToken = (token) => {
  let userData = null;
  jwt.verify(token, process.env.JWT, (err, user) => {
    userData = user;
  });
  return userData;
};
// 리프레시토큰 체크
const checkRefreshToken = (token) => {
  let userData = null;
  jwt.verify(token, process.env.JWT_REFRESH, (err, user) => {
    userData = user;
  });
  return userData;
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  createEmailToken,
  createTemporarilyAccessToken,
  checkAccessToken,
  checkRefreshToken,
};
