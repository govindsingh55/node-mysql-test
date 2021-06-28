const mysql = require('mysql');
const getDBConfig = require("./config");

const dbConfig = getDBConfig();
dbConfig.database = "test1";
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    throw err
  }

  db.query(`CREATE TABLE schedule (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    date DATE, 
    employee_id INT, 
    name VARCHAR(255), 
    working_type VARCHAR(255), 
    start TIME, end TIME, 
    store_id VARCHAR(255), 
    store_name VARCHAR(255))`,
    (err) => {
      if (err) throw err;

      console.log('table created.')
    })
});