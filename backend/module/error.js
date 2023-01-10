const createError = (status, message) => {
  const err = { status, message };
  return err;
};

const createSqlError = (sqlErr) => {
  const err = { message: sqlErr.sqlMessage };
  return err;
};

module.exports = { createError, createSqlError };
