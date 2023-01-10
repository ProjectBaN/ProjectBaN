require("dotenv").config();

const maria = require("../database/maria");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const emailSend = require("../module/sendEmail");
const {
  createError,
  createSqlError,
  checkSqlError,
} = require("../module/error");
const { checkReqBodyData } = require("../module/check");

const authNumber = () => {
  let str = "";
  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};
// 회원가입 데이터 확인 서버에서 한번 더 할꺼면 추가하세요!
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
        return next(checkSqlError(err));
      }
    }
  );
};

// 로그인데이터 확인 서버에서 한번 더 할꺼면 추가하세요!
const signIn = async (req, res, next) => {
  const id = req.body.data.id;
  const password = req.body.data.password;
  if (!checkReqBodyData(req, "id", "password")) {
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

// id중복체크
const idCheck = (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(401).send("값이 없습니다.");
  }

  maria.query(
    "select * from t_users where (users_id)=(?)",
    [id],
    (err, results) => {
      if (err) return next(createError(500, "서버오류"));
      if (results.length === 0) {
        return res.send({
          duplicate: false,
        });
      } else if (results.length !== 0) {
        return res.send({
          duplicate: true,
        });
      }
    }
  );
};

// 이메일 비밀번호 찾기 > 아이디 입력박구 있으면 거기 정도에있는 이메일 전송
const forgetPasswordAuthEmail = (req, res) => {
  const id = req.body.data.id;
  const authNum = authNumber();
  if (!checkReqBodyData(req, "id")) {
    return res.status(401).send("보낸 값이 없습니다.");
  }

  // 1차 아이디 체크
  maria.query(
    "select * from t_users where (users_id)=(?)",
    [id],
    (err, results) => {
      if (results.length === 0) {
        return res.send({
          idCheck: false,
          message: "아이디가 존해하지 않습니다.",
        });
      } else if (results.length !== 0) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(authNum, salt);

        emailSend(results[0].users_email, authNum);
        const token = jwt.sign(
          { authHashNum: hash, id: results[0].users_id },
          process.env.JWT,
          {
            expiresIn: "5m",
          }
        );

        return res
          .cookie("forget_token", token, {
            httpOnly: true,
          })
          .send({
            idCheck: true,
            message: "메세지를 발송합니다.",
          });
      }
    }
  );
};

// 이메일 찾기 체크 비밀번호 생성 허용 토큰 제공
const forgetPasswordAuthCheckEmail = (req, res, next) => {
  // 2차 아이디 체크
  const id = req.id;
  maria.query(
    "select * from t_users where (users_id)=(?)",
    [id],
    (err, results) => {
      if (err) {
        return next(checkSqlError(err, results));
      }
      // 임시 비밀번호 변경 허용 토큰 전송 5분허용
      const token = jwt.sign({ id: results[0].users_id }, process.env.JWT, {
        expiresIn: "5m",
      });
      return res
        .cookie("temporarily_access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ succes: true });
    }
  );
};

// 비밀번호 찾기 후 변경
const temporarilyUpdatePassword = (req, res, next) => {
  if (!checkReqBodyData(req, "password", "user")) {
    return res.status(401).send("값이 없습니다.");
  }

  const id = req.body.data.id;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.data.password, salt);

  maria.query(
    "update t_users set users_password=? where users_id=?",
    [hash, id],
    (err, results) => {
      if (err) {
        return next(checkSqlError(err, results));
      }
      if (!results || results.length === 0) {
        return next(createError(400, "값이존재하지않습니다."));
      }
      return res.send(results);
    }
  );
};

// 아이디찾기 이름,폰
const forgetIdNamePhone = (req, res, next) => {
  if (!checkReqBodyData(req, "name", "phone")) {
    return res.status(401).send("값이 없습니다.");
  }

  const name = req.body.data.name;
  const phone = req.body.data.phone;
  maria.query(
    "select users_id from t_users where users_name=? and users_phone=?",
    [name, phone],
    (err, results) => {
      if (err) {
        return next(checkSqlError(err, results));
      }
      if (!results || results.length === 0) {
        return next(createError(400, "값이존재하지않습니다."));
      }
      return res.status(200).json(results[0]);
    }
  );
};
// 아이디찾기 이메일
const forgetIdEmail = (req, res, next) => {
  if (!checkReqBodyData(req, "email")) {
    return res.status(401).send("값이 없습니다.");
  }

  const email = req.body.data.email;
  maria.query(
    "select users_id from t_users where users_email=?",
    [email],
    (err, results) => {
      if (err) {
        return next(checkSqlError(err, results));
      }
      if (!results || results.length === 0) {
        return next(createError(400, "값이존재하지않습니다."));
      }
      return res.status(200).json(results[0]);
    }
  );
};

module.exports = {
  signUp,
  signIn,
  idCheck,
  forgetPasswordAuthEmail,
  forgetPasswordAuthCheckEmail,
  temporarilyUpdatePassword,
  forgetIdNamePhone,
  forgetIdEmail,
};
