const xlsx = require("xlsx");
const fs = require("fs");
const moment = require("moment");
moment().format();
const mysql = require('mysql');

const db = mysql.createConnection({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "password",
  database: "test1"
});

db.connect((err) => {
  if (err) {
    throw err
  }
  console.log('database connected')
});

const wb = xlsx.readFile("./templateShedule.xlsx");
const ws = wb.Sheets["Sheet 1"];
const data = xlsx.utils.sheet_to_json(ws);

const itemArray = data.reduce((accArray, item) => {
  if (item.date, item["employee id "], item["working type"], item.start, item.end, item["store id"]) {
    accArray.push({
      date: item.date,
      employee_id: item["employee id "],
      name: item.name,
      working_type: item["working type"],
      start: moment(item.start, "hh:mm").format("kk:mm:ss"),
      end: moment(item.end, "kk:mm").format("kk:mm:ss"),
      store_id: item["store id"],
      store_name: item["store name"]
    });
    return accArray
  }

  return accArray
}, []);

itemArray.map((item, index) => {
  db.query(`INSERT INTO schedule(date, employee_id, name, working_type, start, end, store_id, store_name) VALUES ('${item.date}', '${item.employee_id}',' ${item.name ? item.name : null}', '${item.working_type}', '${item.start}', '${item.end}', '${item.store_id}', '${item.store_name ? item.store_name : null}')`, (err) => {
    if (err) throw err;
    console.log(`row ${index} created!`)
  })
})

console.log(itemArray);