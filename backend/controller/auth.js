const maria = require("../database/maria");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
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
        return res.status(400).send("생성실패");
      }
    }
  );
};

// 로그인
const signIn = async (req, res, next) => {
  if (!req.body.data || !req.body.data.id) {
    return res.status(401).send("값이 없습니다.");
  }

  maria.query(
    "select users_password from t_users where (users_id)=(?)",
    [req.body.data.id],
    function (err, results) {
      if (results.length === 0) {
        return res.send("아이디가 없습니다.");
      }
      const pass = "가나다";
      if (!err) {
        const succ = bcrypt.compareSync(pass, `` + results[0].users_password);
        if (succ) {
          return res.status(400).send("로그인성공");
        } else {
          return res.status(404).send("로그인실패");
        }
      }
    }
  );
};

module.exports = {
  signUp,
  signIn,
};
