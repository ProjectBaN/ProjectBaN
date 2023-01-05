const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.listen(8000, console.log("server started"));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/test', (req, res) => {
  res.send('Test World!');
});