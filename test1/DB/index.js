const mysql = require('mysql');
const getDBConfig =  require("./config");

const dbConfig = getDBConfig();

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if(err) {
    throw err
  }

  db.query("CREATE DATABASE test1", (err) => {
    if(err) throw err;

    console.log('database created.')
  })
});