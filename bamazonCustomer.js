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
  // console.log("connected as id " + connection.threadId + "\n");
 readProducts();
});
function readProducts() {
  // console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    // console.log(res);
    console.log("-----------------------------------");
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].product + " | " + res[i].department + " | " + res[i].price + " | " + res[i].stock
    );
    }
    console.log("-----------------------------------");
    // connection.end();
    purchase()
  });
}
  
  function purchase(){
  // console.log("you are in the purchase function ");
    inquirer.prompt([
    {
      type: "input",
      name: "whatpurchase",
      message: "What is the ID of the product that you would like to purchase?",
    },
    {
      type: "input",
      name: "howmany",
      message: "How many would you like?",
    }
  ]).then(function(answer){
    if (answer.whatpurchase >0 <11) {
      console.log("ID of your purchaser is:  "+answer.whatpurchase);
    } else{
      console.log("Try again");
    }
    if (answer.howmany > 0 ) {
      console.log("You would like:  "+answer.howmany);
        }
        else{
        console.log("Try again");
        }
     updateProduct();  
  })
  function updateProduct() {
    console.log("you are in the updateProduct function .\n");
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock: 9//this needs to decrement byanswer.howmany
        },
        {
          id: 1
        }
      ],
      function(err, res) {
        console.log(res.affectedRows + " products updated!\n");
       }
    );
  
    // logs the actual query being run
    console.log(query.sql);
  }



  }
