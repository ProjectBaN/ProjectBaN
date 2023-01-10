const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createError } = require("./error");

// 토큰확인
const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "토큰이없습니다."));
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token is not valid"));
    req.user = user;
    next();
  });
};

// 임시 비밀번호 변경 토큰확인
const verifyTemporarilyAccessToken = (req, res, next) => {
  const token = req.cookies.temporarily_access_token;
  if (!token) return next(createError(401, "토큰이없습니다."));
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token is not valid"));
    req.user = user;
    next();
  });
};

// 이메일 비밀번호 찾기 토큰 인증
const verifyForgetIdToken = (req, res, next) => {
  const token = req.cookies.forget_token;
  const userAuthInput = req.query.authInput;

  if (!token) return next(createError(401, "토큰이없습니다."));
  // jwt 토큰 > bcrypt분해> 비교> 같으면 넘김
  jwt.verify(token, process.env.JWT, (err, idAuth) => {
    if (err) return next(createError(403, "token is not valid"));
    const compare = bcrypt.compareSync(
      "" + userAuthInput,
      "" + idAuth.authHashNum
    );

    if (compare) {
      req.id = idAuth.id;

      next();
    } else {
      next(createError(403, "token is not valid"));
    }
  });
};

module.exports = {
  verifyAccessToken,
  verifyForgetIdToken,
  verifyTemporarilyAccessToken,
};
