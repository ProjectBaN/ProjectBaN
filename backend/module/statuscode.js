// 성공메세지 모듈
const successStatus = (result) => {
  return { success: true, status: 200, data: result };
};

module.exports = { successStatus };
