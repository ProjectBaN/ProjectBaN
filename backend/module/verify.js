const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const maria = require("../database/maria");
const { createError, createSqlError } = require("./error");
const {
  createAccessToken,
  createRefreshToken,
  checkAccessToken,
  checkRefreshToken,
} = require("./token");
const { logger } = require("../config/logger");
const { awaitSql, checkSql } = require("./sqlPromise");
const { successStatus } = require("./statuscode");

// 토큰확인 및 자동로그인
const verifyAccessToken = async (req, res, next) => {
  // 토큰은 만료가된다.
  const accessToken = req.cookies.access_token;
  const refreshToken = req.cookies.refresh_token;
  let dbRefreshToken;

  if (!accessToken && !refreshToken) {
    logger.error("😡 다시 로그인해!");

    return next(createError(401, "login"));
  }

  // db의 비밀번호랑 토큰의 비밀번호가 다르면 아웃
  const check_acces_token = checkAccessToken(accessToken);
  const check_refresh_token = checkRefreshToken(refreshToken);

  // 엑세스 토큰이 살아있다면 엑세스 토큰 비밀번호와 db 비밀번호를 체크
  if (check_acces_token || check_refresh_token) {
    const tokenId = check_acces_token
      ? check_acces_token.id
      : check_refresh_token.id;
    const tokenPw = check_acces_token
      ? check_acces_token.pw
      : check_refresh_token.pw;
    // 디비의 유저정보를 불러와 체크
    const getUserQuery = `select users_id, users_password, users_refresh_token, users_leave_at from t_users where users_id='${tokenId}'`;
    const getUser = await awaitSql(getUserQuery)
      .catch((err) => {
        logger.error(
          "😡 유저정보를 가져오는 도중 SQL 에러가 났어! -> " + err.message
        );

        return { err: err };
      })
      .then((result) => {
        return result;
      });
    if (!checkSql(getUser)) {
      logger.warn("😵‍💫 SQL에러 또는 변화된것이 없어!");
      return next(createError(403, "변화에 문제가 생겼습니다."));
    }

    if (getUser.length === 0 || getUser.users_leave_at) {
      logger.warn("😵‍💫 만족하는 유저가 없습니다!");
    }

    // 디비 토큰이 만료되었거나 강제로그아웃으로 "" 가 된다면 가능하다.
    dbRefreshToken = getUser[0].users_refresh_token;
    const dbCheck_refresh_token = checkRefreshToken(dbRefreshToken);

    if (!dbCheck_refresh_token) {
      logger.error("😡 디비 토큰이 만료되었어!");
      return next(createError(500, "logIn"));
    }
    // 비밀번호를 바꾼뒤 체크문
    if (tokenPw !== getUser[0].users_password) {
      logger.error("😡 위험한 로그인이 발생했어!");
      return res
        .clearCookie("access_token", {
          sameSite: "none",
          secure: true,
        })
        .clearCookie("refresh_token", {
          sameSite: "none",
          secure: true,
        })
        .status(200)
        .json(
          successStatus({ message: "위험한 로그인으로 로그아웃 되었습니다." })
        );
    }
  }

  // console.log("엑세스 O, 리프레시 O");
  if (check_acces_token && check_refresh_token) {
    req.body.user = check_acces_token.id;
    return next();
  }

  // console.log("엑세스 X, 리프레시 O");
  if (!check_acces_token && check_refresh_token) {
    // 현재 유저 비밀번호와 토큰비밀번호가 맞지 않으면 로그아웃!
    console.log("실행됨 -> 엑세스없음");

    const accessToken = createAccessToken(
      check_refresh_token.id,
      check_refresh_token.pw
    );

    res.cookie("access_token", accessToken, {
      httpOnly: true,
    });
    req.body.user = check_refresh_token.id;

    return next();
  }

  // console.log("엑세스 O, 리프레시 X");
  if (check_acces_token && !check_refresh_token) {
    // 현재 유저 비밀번호와 토큰비밀번호가 맞지 않으면 로그아웃!

    res.cookie("refresh_token", dbRefreshToken, {
      httpOnly: true,
    });

    req.body.user = check_acces_token.id;

    return next();
  }
  //2개의 토큰이 다 만료일 경우
  if (!check_acces_token && !check_refresh_token) {
    logger.error("😡 다시 로그인해!");
    return next(createError(500, "logIn"));
  }
};

// 임시 비밀번호 변경 토큰확인
const verifyTemporarilyAccessToken = (req, res, next) => {
  const accessToken = req.cookies.temporarily_access_token;
  if (!accessToken) {
    logger.error("😡 토큰이 없어!");
    return next(createError(401, "토큰이없습니다."));
  }

  jwt.verify(accessToken, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "token is not valid"));
    req.body.data.user = user;
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
      req.body.id = idAuth.id;

      next();
    } else {
      logger.error("😡 인증번호가 잘못됬어!");

      next(createError(403, "token is not valid"));
    }
  });
};

// 관리자인증

module.exports = {
  verifyAccessToken,
  verifyForgetIdToken,
  verifyTemporarilyAccessToken,
};
