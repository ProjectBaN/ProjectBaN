require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const pool = require("./database/maria2");

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
  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query("select * from t_users");
    console.log(result);
  } catch (error) {
  } finally {
    connection.release();
  }

  res.send("hellow world");
});

app.get("/test", (req, res) => {
  res.send("Test World!");
});
