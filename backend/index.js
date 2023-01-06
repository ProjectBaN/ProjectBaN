require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const maria = require('./database/maria');
maria.connect();

app.use(cors());
app.use(express.json());

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