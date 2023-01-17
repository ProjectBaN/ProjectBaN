const checkReqBodyData = (req, ...args) => {
  let check = true;

  if (!req.body) {
    return false;
  } else if (!req.body.data) {
    return false;
  }
  args.forEach((element) => {
    if (!req.body.data[element]) {
      check = false;
      return;
    }
  });
  return check;
};

module.exports = { checkReqBodyData };