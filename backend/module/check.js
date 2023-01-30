//req 안의 데이터  확인
const checkReqBodyData = (req, ...args) => {
  let check = true;

  if (!req.body) {
    return false;
  } else if (!req.body.data) {
    return false;
  }
  args.forEach((element) => {
    if (!req.body.data[element]) {
      console.log(element);

      check = false;
      if (req.body.data[element] === 0) {
        check = true;
      }
      if (req.body.data[element] === "") {
        check = true;
      }
      return;
    }
  });
  return check;
};
// 쿠폰 유표기간 확인
const checkCouponValied = (valiedEnd) => {
  const today = new Date();
  // 쿠폰유효기간 확인
  if (valiedEnd < today) {
    return false;
  }
  return true;
};
module.exports = { checkReqBodyData, checkCouponValied };
