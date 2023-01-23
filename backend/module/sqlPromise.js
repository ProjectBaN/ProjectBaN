require("dotenv").config();

const maria = require("../database/maria");
const { createSqlError, createError } = require("./error");

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
