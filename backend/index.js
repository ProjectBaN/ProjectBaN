require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const couponRouter = require("./routes/coupon");
const cartRouter = require("./routes/cart");
const payRouter = require("./routes/pay");
const orderRouter = require("./routes/order");

const { morganMiddleware } = require("./config/morgen");

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(morganMiddleware);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/coupon", couponRouter);
app.use("/cart", cartRouter);
app.use("/pay", payRouter);
app.use("/order", orderRouter);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});

app.listen(8000, console.log("server started"));

app.get("/", async (req, res, next) => {
  console.log("😀 서버에 접속했어!");
  res.status(403).send("성공");
});

app.get("/test", (req, res) => {
  res.send("Test World!");
});
