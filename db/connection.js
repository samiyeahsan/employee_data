const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: process.env.DB_PW,
   database: 'employee_db'
})

module.exports = db;