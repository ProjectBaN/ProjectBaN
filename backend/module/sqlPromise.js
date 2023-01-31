require("dotenv").config();

const maria = require("../database/maria");

// mysql2 cafe24 오류로 인해 코드가독성을 위해 mysql await 모듈 구현
const awaitSql = (query) => {
  return new Promise((resolve, reject) => {
    maria.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
// sql 문 체크 모듈
const checkSql = (result) => {
  if (result.err) {
    return false;
  }
  if (result.affectedRows === 0) {
    return false;
  }
  return true;
};

module.exports = { awaitSql, checkSql };
