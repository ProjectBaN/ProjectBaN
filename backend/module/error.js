const createError = (status, message) => {
  const err = { status, message };
  return err;
};

module.exports = createError;
