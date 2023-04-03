require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const app = express();

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const couponRouter = require("./routes/coupon");
const cartRouter = require("./routes/cart");
const payRouter = require("./routes/pay");
const orderRouter = require("./routes/order");
const reviewRouter = require("./routes/review");

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
app.use("/review", reviewRouter);

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
  const axiosres = await axios
    .get(
      "https://developer-lostark.game.onstove.com/armories/characters/%EC%95%99%EB%B2%84%ED%84%B0%EB%A7%9D%EA%B5%AC/profiles",
      {
        headers: {
          accept: "application/json",
          authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyIsImtpZCI6IktYMk40TkRDSTJ5NTA5NWpjTWk5TllqY2lyZyJ9.eyJpc3MiOiJodHRwczovL2x1ZHkuZ2FtZS5vbnN0b3ZlLmNvbSIsImF1ZCI6Imh0dHBzOi8vbHVkeS5nYW1lLm9uc3RvdmUuY29tL3Jlc291cmNlcyIsImNsaWVudF9pZCI6IjEwMDAwMDAwMDAxNTg4ODkifQ.k1OFJihJcC450T7qhujoq598e1AwrGcMc2B1BhS8O4bLcxCJNUpHt5MuWup-aVBuKZUDlwiBXrUVlThJBP8f4wCpCCYRnqRbAnQR3k7mQh3P11P-8-1a_gG9Q-PZFCbZIyknPLm7ra1ypibf9g2zmTSWVQYSpgCrT2cwBday1HYV0xjyOknrSIve2PuHzj4rfdcRfZimlIO83V1-SPmMCEsf_qrNge6F6rBztzZwm8KvTRrHawz9RHhKKOtABxbhLC9AdPsEVZExPAUMr9GI0dMo8mdxhN64P8Wmm5hEk4djxyZAFvtQnXLk3Hp-i9W-B8r8Gnv7uKfoE8iXb8UY0Q",
        },
      }
    )
    .then((response) => {
      console.log("성공");
      console.log(response);
      // API 호출 성공시 수행할 작업
    })
    .catch((error) => {
      console.log("실패");
      // API 호출 실패시 수행할 작업
    });
  console.log(axiosres);
  res.status(403).send("성공");
});

app.get("/test", (req, res) => {
  res.send("Test World!");
});
