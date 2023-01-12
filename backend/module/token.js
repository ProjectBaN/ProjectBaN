require("dotenv").config();
const jwt = require("jsonwebtoken");

const createAccessToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT, {
    expiresIn: "4s",
  });
};

const createRefreshToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_REFRESH, {
    expiresIn: "4m",
  });
};

const createEmailToken = (authHashNum, id) => {
  return jwt.sign({ authHashNum: authHashNum, id: id }, process.env.JWT, {
    expiresIn: "5m",
  });
};

const createTemporarilyAccessToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT, {
    expiresIn: "5m",
  });
};

const checkAccessToken = (token) => {
  let userData = null;
  jwt.verify(token, process.env.JWT, (err, user) => {
    userData = user;
  });
  return userData;
};

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
