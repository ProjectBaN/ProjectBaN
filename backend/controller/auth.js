require("dotenv").config();

const maria = require("../database/maria");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const emailSend = require("../module/sendEmail");
const { createError, createSqlError } = require("../module/error");
const { checkReqBodyData } = require("../module/check");
const { successStatus } = require("../module/statuscode");
const {
  createAccessToken,
  createRefreshToken,
  createEmailToken,
  createTemporarilyAccessToken,
} = require("../module/token");
const { logger } = require("../config/logger");

// 보안코드 생성
const authNumber = () => {
  let str = "";
  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};

// 회원가입 ++ 데이터 확인 서버에서 한번 더 할꺼면 추가하세요!
const signUp = async (req, res, next) => {
  if (
    !checkReqBodyData(
      req,
      "id",
      "password",
      "name",
      "gender",
      "email",
      "phone",
      "addr",
      "age",
      "termAge",
      "termUse",
      "termInfo",
      "termEmailAd",
      "termPrivateUse",
      "termAppPush"
    )
  ) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return next(createError(400, "들어온 데이터 값이 부족합니다."));
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.data.password, salt);

  const sql =
    "insert into t_users(users_id, users_password, users_name, users_gender, users_email, users_phone, users_addr, users_age, users_term_required_14age, users_term_required_use, users_term_required_info, users_term_emailAd, users_term_use, users_term_appPush) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  maria.query(
    sql,
    [
      req.body.data.id,
      hash,
      req.body.data.name,
      req.body.data.gender,
      req.body.data.email,
      req.body.data.phone,
      req.body.data.addr,
      req.body.data.age,
      req.body.data.termAge,
      req.body.data.termUse,
      req.body.data.termInfo,
      req.body.data.termEmailAd,
      req.body.data.termPrivateUse,
      req.body.data.termAppPush,
    ],
    (err, rows, fields) => {
      if (!err) {
        return res.status(200).send(successStatus({ success: true }));
      } else {
        logger.error("🤬 회원가입 sql중 오류가 발생했어!! -> " + err.message);
        return next(createError(403, "변화중문제가 발생하였습니다."));
      }
    }
  );
};
// 로그인 ++데이터 확인 서버에서 한번 더 할꺼면 추가하세요!
const signIn = async (req, res, next) => {
  const id = req.body.data.id;
  const password = req.body.data.password;

  if (!checkReqBodyData(req, "id", "password")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return res.status(401).send("값이 없습니다.");
  }

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [id],
    function (err, results) {
      if (err) {
        logger.error(
          "🤬 로그인->아이디 확인 sql중 오류가 발생했어!! -> " + err.message
        );
        return next(createError(403, "변화중문제가 발생하였습니다."));
      }
      if (!results || results.length === 0) {
        logger.warn(`😵‍💫 ${id}의 검색결과 아이디가 없어..`);
        return res.send(CreateError(500, "아이디가 없습니다."));
      }
      if (results[0].users_leave_at) {
        logger.warn(`😮 ${id}는 탈퇴유저였어!`);
        return next(createError(500, "탈퇴한 유저입니다."));
      }

      const dbId = results[0].users_id;
      const dbPassword = results[0].users_password;

      const compare = bcrypt.compareSync(password, `` + dbPassword);

      if (compare) {
        const token = createAccessToken(dbId, dbPassword);
        const refreshToken = createRefreshToken(dbId, dbPassword);

        maria.query(
          "update t_users set users_refresh_token=? where users_id=?",
          [refreshToken, dbId],
          (err, result) => {
            if (err) {
              logger.error(
                "🤬 로그인 -> 리프레시토큰 sql중 오류가 발생했어!! -> " +
                  err.message
              );
              return next(createError(403, "변화중문제가 발생하였습니다."));
            }
          }
        );

        return res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .cookie("refresh_token", refreshToken, {
            httpOnly: true,
          })
          .status(200)
          .json(successStatus({ message: "로그인 성공" }));
      } else {
        logger.warn(`${dbId}접속 실패 하였습니다.`);
        next(createError(500, "아이디 또는 비밀번호가 없습니다."));
      }
    }
  );
};

// 로그아웃 리프레시 토큰 추가시 추가작업
const signOut = (req, res, next) => {
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
    .json(successStatus({ message: "성공" }));
};

// id 중복체크
const idCheck = (req, res, next) => {
  const id = req.query.id;

  if (!id) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return res.status(401).send("값이 없습니다.");
  }

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [id],
    (err, results) => {
      if (err) {
        logger.error("😡 id 중복체크 중 SQL오류가 났어! -> " + err.message);
        return next(createError(500, "서버오류"));
      }
      if (results.length === 0) {
        return res.send(successStatus({ duplicate: false }));
      } else if (results.length !== 0) {
        return next(createError(500, "중복입니다."));
      }
    }
  );
};

// email 중복체크
const emailCheck = (req, res, next) => {
  const email = req.query.email;

  if (!email) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return res.status(401).send("값이 없습니다.");
  }

  maria.query(
    "select * from t_users where (users_email)=(?)",
    [email],
    (err, results) => {
      if (err) {
        logger.error("😡 email 중복체크 중 SQL오류가 났어! -> " + err.message);

        return next(createError(500, "서버오류"));
      }
      if (results.length === 0) {
        return res.send(successStatus({ duplicate: false }));
      } else if (results.length !== 0) {
        return next(createError(500, "중복입니다."));
      }
    }
  );
};

// phone 중복체크
const phoneCheck = (req, res, next) => {
  const phone = req.query.phone;

  if (!phone) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return res.status(401).send("값이 없습니다.");
  }

  maria.query(
    "select * from t_users where (users_phone)=(?)",
    [phone],
    (err, results) => {
      if (err) {
        logger.error(
          "😡 [phone] 중복체크 중 SQL오류가 났어! -> " + err.message
        );
        return next(createError(500, "서버오류"));
      }
      if (results.length === 0) {
        return res.send(successStatus({ duplicate: false }));
      } else if (results.length !== 0) {
        return next(createError(500, "중복입니다."));
      }
    }
  );
};

// 이메일 비밀번호 찾기 > 아이디 입력받구 있으면 거기 정보에있는 이메일 전송
const forgetPasswordAuthEmail = (req, res, next) => {
  const id = req.body.data.id;
  const authNum = authNumber();
  if (!checkReqBodyData(req, "id")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return res.status(401).send("보낸 값이 없습니다.");
  }

  // 1차 아이디 체크
  maria.query(
    "select * from t_users where (users_id)=(?)",
    [id],
    (err, results) => {
      if (err) {
        logger.error(
          "😡 이메일 비밀번호 찾기 ID 체크 중 SQL오류가 났어! -> " + err.message
        );
      }
      if (results.length === 0) {
        logger.warn(`😵‍💫 ${id}의 검색결과 아이디가 없어..`);

        return res.send({
          idCheck: false,
          message: "아이디가 존해하지 않습니다.",
        });
      }
      if (results[0].users_leave_at) {
        logger.warn(`😮 ${id}는 탈퇴유저였어!`);
        return next(createError(500, "탈퇴한 유저의 아이디입니다."));
      }
      if (results.length !== 0) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(authNum, salt);
        const dbId = results[0].users_id;
        emailSend(results[0].users_email, authNum);
        const token = createEmailToken(hash, dbId);

        return res
          .cookie("forget_token", token, {
            httpOnly: true,
          })
          .send(
            successStatus({
              idCheck: true,
              message: "메세지를 발송합니다.",
            })
          );
      }
    }
  );
};

// 이메일 찾기 체크 비밀번호 생성 허용 토큰 제공
const forgetPasswordAuthCheckEmail = (req, res, next) => {
  // 2차 아이디 체크

  const id = req.body.id;
  maria.query(
    "select * from t_users where (users_id)=(?)",
    [id],
    (err, results) => {
      if (err) {
        logger.warn(
          "😡 이메일 비밀번호 찾기 액세스토큰 발급 -> ID 체크 중 SQL오류가 났어! -> " +
            err.message
        );
        return next(createError(403, "변화중문제가 발생하였습니다."));
      }
      if (results.length === 0) {
        logger.warn(`😵‍💫 ${id}의 검색결과 아이디가 없어..`);
        return next(createError(500, "값이 존재하지않습니다."));
      }
      if (results[0].users_leave_at) {
        logger.warn(`😮 ${id}는 탈퇴유저였어!`);
        logger.warn(`${id} 탈퇴한유저입니다.`);

        return next(createError(500, "탈퇴한 유저의 아이디입니다."));
      }
      const dbId = results[0].users_id;
      // 임시 비밀번호 변경 허용 토큰 전송 5분허용
      const token = createTemporarilyAccessToken(dbId);

      return res
        .cookie("temporarily_access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .clearCookie("forget_token", {
          sameSite: "none",
          secure: true,
        })
        .json(successStatus({ succes: true }));
    }
  );
};

// 비밀번호 찾기 후 변경
const temporarilyUpdatePassword = (req, res, next) => {
  if (!checkReqBodyData(req, "password", "user")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return res.status(401).send();
  }
  const id = req.body.data.user.id;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.data.password, salt);
  maria.query(
    "update t_users set users_password=? where users_id=?",
    [hash, id],
    (err, results) => {
      if (err) {
        logger.warn(
          "😡 이메일 비밀번호 찾기 -> 비밀번호 변경 중 SQL오류가 났어! -> " +
            err.message
        );

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }
      if (!results || results.length === 0) {
        logger.warn(`😵‍💫 ${id}의 비밀번호 변경이 실패했어..`);
        return next(createError(500, "변경 실패하였습니다."));
      }
      return res
        .clearCookie("temporarily_access_token", {
          sameSite: "none",
          secure: true,
        })
        .send(successStatus(successStatus({ success: true })));
    }
  );
};

// 아이디찾기 이름,폰
const forgetIdNamePhone = (req, res, next) => {
  if (!checkReqBodyData(req, "name", "phone")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return res.status(401).send("값이 없습니다.");
  }

  const name = req.body.data.name;
  const phone = req.body.data.phone;

  maria.query(
    "select users_id, users_leave_at from t_users where users_name=? and users_phone=?",
    [name, phone],
    (err, results) => {
      if (err) {
        logger.warn(
          "😡 이름과 폰으로 ID 찾기 중 SQL오류가 났어! -> " + err.message
        );
        return next(createError(403, "변화중문제가 발생하였습니다."));
      }
      if (!results || results.length === 0) {
        logger.warn(`😵‍💫 검색결과가 없어..`);

        return next(createError(400, "값이존재하지않습니다."));
      }
      if (results[0].users_leave_at) {
        return res
          .status(200)
          .json(successStatus({ leave_at: results[0].users_leave_at }));
      }
      return res
        .status(200)
        .json(successStatus({ users_id: results[0].users_id }));
    }
  );
};
// 아이디찾기 이메일
const forgetIdEmail = (req, res, next) => {
  if (!checkReqBodyData(req, "email")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return res.status(401).send("값이 없습니다.");
  }

  const email = req.body.data.email;
  maria.query(
    "select users_id from t_users where users_email=?",
    [email],
    (err, results) => {
      if (err) {
        logger.warn("😡 이메일로 ID 찾기 중 SQL오류가 났어! -> " + err.message);

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }
      if (!results || results.length === 0) {
        logger.warn(`😵‍💫 검색결과가 없어..`);

        return next(createError(400, "값이존재하지않습니다."));
      }
      if (results[0].users_leave_at) {
        return res
          .status(200)
          .json(successStatus({ leave_at: results[0].users_leave_at }));
      }
      return res.status(200).json(successStatus(results[0]));
    }
  );
};

module.exports = {
  signUp,
  signIn,
  idCheck,
  emailCheck,
  forgetPasswordAuthEmail,
  forgetPasswordAuthCheckEmail,
  temporarilyUpdatePassword,
  forgetIdNamePhone,
  forgetIdEmail,
  signOut,
  phoneCheck,
};
