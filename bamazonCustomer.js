//required NPMs
var inquirer = require("inquirer");
var fs = require("fs");
//https://www.npmjs.com/package/mysql
var mysql = require("mysql");
//connect to the dv
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "midnight1",
  database: "bamazon"
});
//check if connection worked then begin the
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  //inquier propmpt with the switch cases
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
