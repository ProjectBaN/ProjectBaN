const jwt = require("jsonwebtoken");
const createError = require("./error");
const bcrypt = require("bcrypt");

const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "토큰이없습니다."));
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token is not valid"));
    req.user = user;
    next();
  });
};

// 아이디 토큰 인증
const verifyForgetIdToken = (req, res, next) => {
  const token = req.cookies.forget_token;
  const userAuthInput = req.query.authInput;

  if (!token) return next(createError(401, "토큰이없습니다."));
  // jwt 토큰 > bcrypt분해> 비교> 같으면 넘김
  jwt.verify(token, process.env.JWT, (err, idAuth) => {
    if (err) return next(createError(403, "token is not valid"));
    console.log(idAuth);
    const compare = bcrypt.compareSync(
      "" + userAuthInput,
      "" + idAuth.authHashNum
    );

    if (compare) {
      req.email = idAuth.email;

      next();
    } else {
      next(createError(403, "token is not valid"));
    }
  });
};

module.exports = { verifyAccessToken, verifyForgetIdToken };
