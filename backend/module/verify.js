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

// 토큰확인
const verifyAccessToken = async (req, res, next) => {
  const accessToken = req.cookies.access_token;

  const refreshToken = req.cookies.refresh_token;

  if (!accessToken && !refreshToken) {
    logger.error("😡 다시 로그인해!");

    return next(createError(401, "login"));
  }

  maria.query(
    "select users_refresh_token from t_users where users_refresh_token=(?)",
    [refreshToken],
    (err, result) => {
      if (err) {
        logger.error(
          "😡 리프레시 토큰을 찾는 중 SQL오류가 났어! -> " + err.message
        );

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }

      // 토큰 초기화 고려
      if (
        result.length === 0 ||
        refreshToken !== result[0].users_refresh_token
      ) {
        logger.error("😡 비정상적 토큰인거같아!");

        return next(createError(401, "비정상적 토큰"));
      }

      // 체크후 실행
      const check_acces_token = checkAccessToken(accessToken);
      const check_refresh_token = checkRefreshToken(refreshToken);

      // console.log("엑세스 O, 리프레시 O");

      if (check_acces_token && check_refresh_token) {
        req.body.user = check_acces_token.id;
        return next();
      }

      // console.log("엑세스 X, 리프레시 O");

      if (!check_acces_token && check_refresh_token) {
        const accessToken = createAccessToken(check_refresh_token.id);

        res.cookie("access_token", accessToken, {
          httpOnly: true,
        });
        req.body.user = check_refresh_token.id;

        return next();
      }

      // console.log("엑세스 O, 리프레시 X");

      if (check_acces_token && !check_refresh_token) {
        const refreshToken = createRefreshToken(check_acces_token.id);

        maria.query(
          "update t_users set users_refresh_token=? where users_id=?",
          [refreshToken, check_acces_token.id],
          (err, result) => {
            if (err) {
              logger.error(
                "😡 리프레시 토큰을 업데이트 중 SQL오류가 났어! -> " +
                  err.message
              );

              return next(createError(403, "변화중문제가 발생하였습니다."));
            }
            res.cookie("refresh_token", refreshToken, { httpOnly: true });

            req.body.user = check_acces_token.id;

            return next();
          }
        );
      }
      // console.log("엑세스 X, 리프레시 X");
      if (!check_acces_token && !check_refresh_token) {
        logger.error("😡 다시 로그인해!");
        return next(createError(500, "logIn"));
      }
    }
  );
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
