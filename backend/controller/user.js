require("dotenv").config();

const maria = require("../database/maria");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  createError,
  createSqlError,
  checkSqlError,
} = require("../module/error");
const { successStatus } = require("../module/statuscode");
const { checkReqBodyData } = require("../module/check");

// 비밀번호 제외한 유저 정보를 찾아옴
const getUserInfo = (req, res, next) => {
  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.user.id],
    (err, results) => {
      if (err) {
        return next(createSqlError(err));
      }
      const { users_password, ...others } = results[0];
      res.status(200).send(successStatus(others));
    }
  );
};

// 미들웨어로 토큰체크후 토큰 id와 입력id이용해 업데이트
const updateId = (req, res, next) => {
  if (!req.body.data || !req.body.data.id) {
    return res.status(401).send("값이 없습니다.");
  }

  if (req.body.data.id === req.body.user.id) {
    return res.status(401).send("동일한 아이디 입니다.");
  }
  const updateId = req.body.data.id;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user.id],
    (err, results) => {
      if (err) {
        return next(createSqlError(err));
      }
      maria.query(
        "update t_users set users_id=? where users_id=?",
        [updateId, req.body.user.id],
        (err, results) => {
          if (err) {
            return next(createSqlError(err));
          }
          const token = jwt.sign({ id: updateId }, process.env.JWT);
          return res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .send(successStatus({ message: "성공" }));
        }
      );
    }
  );
};

// 방식채택안됨 추후 추가예정
const deleteId = (req, res) => {};

const udatePassword = (req, res, next) => {
  if (!checkReqBodyData(req, "password")) {
    return next(createError(400, "입력된 값이 없습니다."));
  }

  const updatePassword = req.body.data.password;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user.id],
    (err, results) => {
      if (err) {
        return next(createSqlError(err));
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(updatePassword, salt);

      maria.query(
        "update t_users set users_password=? where users_id=?",
        [hash, req.body.user.id],
        (err, results) => {
          if (err) {
            return next(createSqlError(err));
          }
          // const token = jwt.sign({ id: updateId }, process.env.JWT);
          // return res
          //   .cookie("access_token", token, {
          //     httpOnly: true,
          //   })
          //   .status(200)
          //   .send(successStatus(others));
          return res.send(successStatus({ message: "성공하였습니다." }));
        }
      );
    }
  );
};
const udateName = (req, res, next) => {
  return res.send("udateName");
  if (!checkReqBodyData(req, "password")) {
    return next(createError(400, "입력된 값이 없습니다."));
  }

  const updatePassword = req.body.data.password;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.body.user.id],
    (err, results) => {
      if (err) {
        return next(createSqlError(err));
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(updatePassword, salt);

      maria.query(
        "update t_users set users_password=? where users_id=?",
        [hash, req.body.user.id],
        (err, results) => {
          if (err) {
            return next(createSqlError(err));
          }
          // const token = jwt.sign({ id: updateId }, process.env.JWT);
          // return res
          //   .cookie("access_token", token, {
          //     httpOnly: true,
          //   })
          //   .status(200)
          //   .send(successStatus(others));
          return res.send(successStatus({ message: "성공하였습니다." }));
        }
      );
    }
  );
};
const udateGender = (req, res, next) => {};
const udateEmail = (req, res, next) => {};
const udateAddr = (req, res, next) => {};
const udateAge = (req, res, next) => {};

module.exports = {
  getUserInfo,
  updateId,
  deleteId,
  udatePassword,
  udateName,
  udateGender,
  udateEmail,
  udateAddr,
  udateAge,
};
