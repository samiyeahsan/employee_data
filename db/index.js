const mysql = require("mysql2");
const connection = require("./config/connecttion.js")

const db = mysql.createConnection(connection)


function getAllEmployees(){
  db.query("....." , (err, data) => {
    return data
  })
}


