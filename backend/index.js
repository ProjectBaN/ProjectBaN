require('dotenv').config();

const express = require('express');
const cors = require('cors');


const app = express();

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');



app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);


app.listen(8000, console.log("server started"));

app.get('/', (req, res) => {

});


app.get('/test', (req, res) => {
  res.send('Test World!');
});