// mysql2 대비 파일
require("dotenv").config();

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWARD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
  typeCast: function (field, next) {
    console.log(field);
    if (field.type == "VAR_STRING" || field.type == "STRING") {
      return field.string();
    }
    return next();
  },
});

module.exports = pool;
