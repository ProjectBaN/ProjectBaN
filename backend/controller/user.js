require("dotenv").config();

const maria = require("../database/maria");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createError, createSqlError } = require("../module/error");

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
      res.status(200).send(others);
    }
  );
};

// 미들웨어로 토큰체크후 토큰id로 sql갱신
const updateId = (req, res, next) => {
  if (!req.body.data || !req.body.data.id) {
    return res.status(401).send("값이 없습니다.");
  }

  const updateId = req.body.data.id;

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [req.user.id],
    (err, results) => {
      if (err) {
        return next(createSqlError(err));
      }
      maria.query(
        "update t_users set users_id=? where users_id=?",
        [updateId, req.user.id],
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
            .send("succecs");
        }
      );
    }
  );
};

// 방식채택안됨 추후 추가예정
const deleteId = (res, req) => {};

const temporarilyUpdatePassword = (req, res) => {};

module.exports = {
  getUserInfo,
  updateId,
  deleteId,
  temporarilyUpdatePassword,
};
