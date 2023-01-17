require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

const maria = require("./database/maria");
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);

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

app.get("/", async (req, res) => {
  const name = "김병민4";
  maria.query(
    "select * from t_coupon_users as cu join t_coupon as c on cu.t_coupon_num = c.t_coupon_num join t_coupon_rules as cr on c.t_coupon_rules_num = cr.t_coupon_rules_num where t_users_id = ?",
    [name],
    (err, results) => {
      if (err) {
        console.log(err);
        return res.send("에러");
      }
      if (results) {
        console.log(results);
        return res.send("성공");
      } else {
        return res.send("hellow world");
      }
    }
  );
});

app.get("/test", (req, res) => {
  res.send("Test World!");
});
