require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");

const maria = require("./database/maria");
const { awaitSql } = require("./module/sqlPromise");
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);

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
  const name1 = "'김병민4'";
  const query1 = `select * from t_users where users_id = ${name1}`;
  const results1 = await awaitSql(query1);
  console.log(results1);

  const name2 = "'김병민1'";
  const query2 = `select * from t_users where users_id = ${name2}`;
  const results2 = await awaitSql(query2);

  res.send(results1);
});

app.get("/test", (req, res) => {
  res.send("Test World!");
});
