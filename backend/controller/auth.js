const maria = require("../database/maria");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  if (!req.body.data) {
    return res.status(401).send("값이없습니다.");
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync("가나다", salt);

  maria.query(
    "insert into t_users(users_id, users_password, users_name, users_gender, users_email, users_phone, users_addr, users_age, users_term_required_14age, users_term_required_use, users_term_required_info, users_term_emailAd, users_term_use, users_term_appPush) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      "김병민1",
      hash,
      "김",
      "M",
      "aaa@naver.com1",
      "0104340",
      "대구달서구",
      "27",
      "T",
      "T",
      "b",
      "F",
      "a",
      "F",
    ],
    (err, rows, fields) => {
      if (!err) {
        return res.send("secc");
      } else {
        return res.send(err);
      }
    }
  );
};
const sign = async (req, res, next) => {
  maria.query(
    "select users_password from t_users where users_id='김병민1'",
    (err, rows, fields) => {
      const name = "가나다";
      if (!err) {
        const succ = bcrypt.compareSync(name, `` + rows[0].users_password);
        res.send(rows);
      } else {
        res.send(err);
      }
    }
  );
};

module.exports = {
  signUp,
  sign,
};
