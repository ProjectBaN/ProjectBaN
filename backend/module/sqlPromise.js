require("dotenv").config();

const maria = require("../database/maria");

const awaitSql = (query) => {
  console.log(query);
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

module.exports = { awaitSql };
