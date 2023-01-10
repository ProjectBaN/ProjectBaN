const createError = (status, message) => {
  const err = { status, message };
  return err;
};

const createSqlError = (sqlErr) => {
  const err = { message: sqlErr.sqlMessage };
  return err;
};

const checkSqlError = (sqlerr, results) => {
  if (sqlerr) {
    return createSqlError(sqlerr);
  }
  if (!results || results.length === 0) {
    return createError(400, "값이존재하지않습니다.");
  }
};

module.exports = { createError, createSqlError, checkSqlError };
