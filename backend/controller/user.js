require("dotenv").config();

const maria = require("../database/maria");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createError, createSqlError } = require("../module/error");
const { successStatus } = require("../module/statuscode");
const { checkReqBodyData } = require("../module/check");
const { logger } = require("../config/logger");

// 비밀번호 제외한 유저 정보를 찾아옴
const getUserInfo = (req, res, next) => {
  if (!req.body.user) {
    logger.warn("😵‍💫 들어온 유저 데이터 값이 부족해...");
    return next(createError(401, "값이없습니다."));
  }
  maria.query(
    "select * from t_users where (users_id)=( ? )",
    [req.body.user],
    (err, results) => {
      if (err) {
        logger.error(
          "😡 유저 정보를 찾는 중 SQL오류가 났어! -> " + err.message
        );

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }
      if (results.length === 0) {
        logger.warn(`😵‍💫 검색결과가 없어..`);

        return next(createError(401, "결과가없습니다."));
      }
      const { users_password, ...others } = results[0];
      return res.status(200).send(successStatus(others));
    }
  );
};

// 미들웨어로 토큰체크후 토큰 id와 입력 id이용해 업데이트
const updateId = (req, res, next) => {
  if (!req.body.data || !req.body.data.id) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");
    return res.status(401).send("값이 없습니다.");
  }

  if (req.body.data.id === req.body.user) {
    logger.warn("😵‍💫 들어온 유저 값이 동일한 아이디 입니다...");

    return res.status(401).send("동일한 아이디 입니다.");
  }
  const updateId = req.body.data.id;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user],
    (err, results) => {
      if (err) {
        logger.error(
          "😡 유저 정보를 찾는 중 SQL오류가 났어! -> " + err.message
        );
        return next(createError(403, "변화중문제가 발생하였습니다."));
      }
      maria.query(
        "update t_users set users_id=? where users_id=?",
        [updateId, req.body.user],
        (err, results) => {
          if (err) {
            logger.error("😡 유저 수정 중 SQL오류가 났어! -> " + err.message);

            return next(createError(403, "변화중문제가 발생하였습니다."));
          }
          const token = jwt.sign({ id: updateId }, process.env.JWT);
          const refreshToken = jwt.sign(
            { id: updateId },
            process.env.JWT_REFRESH,
            {
              expiresIn: "14d",
            }
          );
          maria.query(
            "update t_users set users_refresh_token=? where users_id=?",
            [refreshToken, updateId],
            (err, result) => {
              if (err) {
                logger.error(
                  "😡 리트레시 토큰 등록 중 SQL오류가 났어! -> " + err.message
                );
                return next(createError(403, "변화중문제가 발생하였습니다."));
              }
            }
          );

          return res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json(successStatus({ message: "성공" }));
        }
      );
    }
  );
};

// 비밀번호 변경
const updatePassword = (req, res, next) => {
  if (!checkReqBodyData(req, "password")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }
  if (!req.body.user) {
    logger.warn("😵‍💫 들어온 유저 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }

  const updatePassword = req.body.data.password;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user],
    (err, results) => {
      if (err) {
        logger.error(
          "😡  유저정보를 업데이트 중 SQL오류가 났어! -> " + err.message
        );

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(updatePassword, salt);

      maria.query(
        "update t_users set users_password=? where users_id=?",
        [hash, req.body.user],
        (err, results) => {
          if (err) {
            logger.error(
              "😡  비밀변호 변경 중 SQL오류가 났어! -> " + err.message
            );

            return next(createError(403, "변화중문제가 발생하였습니다."));
          }

          return res.send(successStatus({ message: "성공하였습니다." }));
        }
      );
    }
  );
};
// 이름 변경
const updateName = (req, res, next) => {
  if (!checkReqBodyData(req, "name")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }

  const updateName = req.body.data.name;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user],
    (err, results) => {
      if (err) {
        logger.error(
          "😡  유저정보를 찾는 중 SQL오류가 났어! -> " + err.message
        );

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }

      maria.query(
        "update t_users set users_name=? where users_id=?",
        [updateName, req.body.user],
        (err, results) => {
          if (err) {
            logger.error(
              "😡  유저정보를 업데이트 중 SQL오류가 났어! -> " + err.message
            );

            return next(createError(403, "변화중문제가 발생하였습니다."));
          }

          return res.send(successStatus({ message: "성공하였습니다." }));
        }
      );
    }
  );
};
// 성별 변경
const updateGender = (req, res, next) => {
  if (!checkReqBodyData(req, "gender")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }
  if (
    req.body.data.gender !== "D" &&
    req.body.data.gender !== "M" &&
    req.body.data.gender !== "F"
  ) {
    logger.warn("잘못된 값 입니다.");

    return next(createError(401, "잘못됩 입력값입니다."));
  }
  const updateGender = req.body.data.gender;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user],
    (err, results) => {
      if (err) {
        logger.error(
          "😡  유저정보를 찾는 중 SQL오류가 났어! -> " + err.message
        );

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }

      maria.query(
        "update t_users set users_gender=? where users_id=?",
        [updateGender, req.body.user],
        (err, results) => {
          if (err) {
            logger.error(
              "😡  유저정보를 업데이트 중 SQL오류가 났어! -> " + err.message
            );

            return next(createError(403, "변화중문제가 발생하였습니다."));
          }

          return res.send(successStatus({ message: "성공하였습니다." }));
        }
      );
    }
  );
};
//email변경
const updateEmail = (req, res, next) => {
  if (!checkReqBodyData(req, "email")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }

  const updateEmail = req.body.data.email;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user],
    (err, results) => {
      if (err) {
        logger.error(
          "😡  유저정보를 찾는 중 SQL오류가 났어! -> " + err.message
        );

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }

      maria.query(
        "update t_users set users_email=? where users_id=?",
        [updateEmail, req.body.user],
        (err, results) => {
          if (err) {
            logger.error(
              "😡  유저정보를 업데이트 중 SQL오류가 났어! -> " + err.message
            );

            return next(createError(403, "변화중문제가 발생하였습니다."));
          }

          return res.send(successStatus({ message: "성공하였습니다." }));
        }
      );
    }
  );
};
//주소 변경
const updateAddr = (req, res, next) => {
  if (!checkReqBodyData(req, "addr")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }

  const updateAddr = req.body.data.addr;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user],
    (err, results) => {
      if (err) {
        logger.error(
          "😡  유저정보를 찾는 중 SQL오류가 났어! -> " + err.message
        );

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }

      maria.query(
        "update t_users set users_addr=? where users_id=?",
        [updateAddr, req.body.user],
        (err, results) => {
          if (err) {
            logger.error(
              "😡  유저정보를 업데이트 중 SQL오류가 났어! -> " + err.message
            );

            return next(createError(403, "변화중문제가 발생하였습니다."));
          }

          return res.send(successStatus({ message: "성공하였습니다." }));
        }
      );
    }
  );
};
//udateAge
const updateAge = (req, res, next) => {
  if (!checkReqBodyData(req, "age")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(400, "입력된 값이 없습니다."));
  }

  const updateAge = req.body.data.age;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user],
    (err, results) => {
      if (err) {
        logger.error(
          "😡  유저정보를 찾는 중 SQL오류가 났어! -> " + err.message
        );

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }

      maria.query(
        "update t_users set users_age=? where users_id=?",
        [updateAge, req.body.user],
        (err, results) => {
          if (err) {
            logger.error(
              "😡  유저정보를 업데이트 중 SQL오류가 났어! -> " + err.message
            );

            return next(createError(403, "변화중문제가 발생하였습니다."));
          }

          return res.send(successStatus({ message: "성공하였습니다." }));
        }
      );
    }
  );
};

// 유저삭제 협의후 결졍
const deleteUser = (req, res, next) => {
  if (!checkReqBodyData(req, "agree")) {
    logger.warn("😵‍💫 들어온 데이터 값이 부족해...");

    return next(createError(401, "입력된 값이 없습니다."));
  }

  if (req.body.data.agree === "F") {
    logger.warn("😵‍💫 동의된 값이 아니야...");

    return next(createError(401, "동의가 되지않았습니다."));
  }

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user],
    (err, results) => {
      if (err) {
        logger.error(
          "😡  유저정보를 찾는 중 SQL오류가 났어! -> " + err.message
        );

        return next(createError(403, "변화중문제가 발생하였습니다."));
      }

      maria.query(
        "update t_users set users_leave_at=now() where users_id=?",
        [req.body.user],
        (err, results) => {
          if (err) {
            logger.error(
              "😡  유저정보를 업데이트 중 SQL오류가 났어! -> " + err.message
            );

            return next(createError(403, "변화중문제가 발생하였습니다."));
          }

          return res.send(successStatus({ message: "성공하였습니다." }));
        }
      );
    }
  );
};

module.exports = {
  getUserInfo,
  updateId,
  updatePassword,
  updateName,
  updateGender,
  updateEmail,
  updateAddr,
  updateAge,
  deleteUser,
};
