var inquirer = require("inquirer");
var fs = require("fs");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "midnight1",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

connection.query(
  "ALTER TABLE products ADD totalSales DECIMAL(10,2) NULL",
  function(err, result) {
    if (err) {
      console.log("ERROR:" + err.message);
    } else {
      console.log("new column added");
    }
  }
);
