const maria = require('mysql');

const conn = maria.createConnection({
  host: 'baroyogida.com',
  port: 3306,
  user: 'yogidaitzy',
  password: 'silver@3847>>',
  database: 'yogidaitzy'
})

module.exports = conn;