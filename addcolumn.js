//required NPMs
var inquirer = require("inquirer");
var fs = require("fs");
//https://www.npmjs.com/package/mysql
var mysql = require("mysql");
//connect to the db
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "midnight1",
  database: "bamazon"
});
//check if connection worked then begin the program
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

//https://stackoverflow.com/questions/11081526/update-my-table-and-insert-new-column-in-mysql-using-nodejs
//http://www.hostingadvice.com/how-to/mysql-alter-table/
//https://dev.mysql.com/doc/refman/5.7/en/alter-table-examples.html

//add column for total sales

connection.query('ALTER TABLE products ADD totalSales DECIMAL(10,2) NULL',function(err,result){
    if(err){
        console.log("ERROR:"+err.message);
    }
    else{
        console.log("new column added");
    }
});
