const successStatus = (result) => {
  return { success: true, status: 200, data: result };
};

module.exports = { successStatus };
