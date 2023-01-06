require('dotenv').config();

const express = require('express');
const cors = require('cors');

const maria = require('./database/maria');

const app = express();

const userRouter = require('./routes/user');

maria.connect();

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);



app.listen(8000, console.log("server started"));

app.get('/', (req, res) => {
  maria.query("select * from test", (err, rows, fields) => {
    if (!err) {
      console.log("succ");
      res.send(rows);
    } else {
      console.log("err" + err);
    }
    })
});


app.get('/test', (req, res) => {
  res.send('Test World!');
});