const payTest = async (req, res, next) => {
  const paymentKey = req.query.paymentKey;
  const addr = req.query.addr;

  const orderId = req.query.orderId;
  const amount = req.query.amount;

  return res.send(addr);
};

module.exports = { payTest };
