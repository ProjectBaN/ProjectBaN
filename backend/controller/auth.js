require("dotenv").config();

const maria = require("../database/maria");
const bcrypt = require("bcrypt");
const createError = require("../module/error");
const jwt = require("jsonwebtoken");

require("dotenv").config();
// 회원가입 데이터 확인 서버에서 한번 더 할꺼면 추가하세요!
const signUp = async (req, res, next) => {
  if (
    !req.body.data ||
    !req.body.data.id ||
    !req.body.data.password ||
    !req.body.data.name ||
    !req.body.data.gender ||
    !req.body.data.email ||
    !req.body.data.phone ||
    !req.body.data.addr ||
    !req.body.data.age ||
    !req.body.data.termAge ||
    !req.body.data.termUse ||
    !req.body.data.termInfo ||
    !req.body.data.termEmailAd ||
    !req.body.data.termPrivateUse ||
    !req.body.data.termAppPush
  ) {
    return res.status(401).send("값이 없습니다.");
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
        return res.status(200).send("생성성공");
      } else {
        next(err);
      }
    }
  );
};

// 로그인데이터 확인 서버에서 한번 더 할꺼면 추가하세요!
const signIn = async (req, res, next) => {
  const id = req.body.data.id;
  const password = req.body.data.password;

  if (!req.body.data || !id || !password) {
    return res.status(401).send("값이 없습니다.");
  }

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [id],
    function (err, results) {
      if (results.length === 0) {
        return res.send("아이디가 없습니다.");
      }
      if (!err) {
        const compare = bcrypt.compareSync(
          password,
          `` + results[0].users_password
        );
        if (compare) {
          const token = jwt.sign({ id: results[0].users_id }, process.env.JWT);
          const { users_password, ...others } = results[0];
          return res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json(others);
        } else {
          next(createError(500, "아이디 또는 비밀번호가 없습니다."));
        }
      }
    }
  );
};

module.exports = {
  signUp,
  signIn,
};
