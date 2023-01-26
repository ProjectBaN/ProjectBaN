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
      return;
    }
  });
  return check;
};

module.exports = { checkReqBodyData };
