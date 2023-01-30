require("dotenv").config();

const maria = require("mysql");

// multipleStatements:
// typeCast: 위의 설저은 마리아 db cafe24 한글깨짐으로 인해 설정한 값입니다.
const conn = maria.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWARD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
  typeCast: function (field, next) {
    if (field.type == "VAR_STRING" || field.type == "STRING") {
      return field.string();
    }
    return next();
  },
});

module.exports = conn;
