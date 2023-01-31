// 에러생성 모듈
const createError = (status, message) => {
  const err = { status, message };
  return err;
};

//SQL 에러생성 모듈
const createSqlError = (sqlErr) => {
  const err = { message: sqlErr.sqlMessage };
  return err;
};
// SQL 에러 체크 모듈
const checkSqlError = (sqlerr, results) => {
  if (sqlerr) {
    return createError(403, "변화중문제가 발생하였습니다.");
  }
  if (!results || results.length === 0) {
    return createError(400, "값이존재하지않습니다.");
  }
};

module.exports = { createError, createSqlError, checkSqlError };
