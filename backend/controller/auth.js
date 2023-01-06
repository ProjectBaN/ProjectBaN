const maria = require("../database/maria");

const signUp = async (req, res) => {
  maria.query(
    "insert into t_users(users_id, users_password, users_name, users_gender, users_email, users_phone, users_addr, users_age, users_term_required_14age, users_term_required_use, users_term_required_info, users_term_emailAd, users_term_use, users_term_appPush) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      "김병민",
      "비밀번호",
      "김",
      "M",
      "aaa@naver.com",
      "0104340",
      "대구달서구",
      "27",
      "T",
      "T",
      "T",
      "F",
      "F",
      "F",
    ],
    (err, rows, fields) => {
      if (!err) {
        console.log("succ");
      } else {
        console.log("err" + err);
      }
    }
  );
};

module.exports = {
  signUp,
};
