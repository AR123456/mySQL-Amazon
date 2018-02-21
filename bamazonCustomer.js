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
// display the products table 
connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  // Log all results of the SELECT statement
  // console.log(res);
  console.log("----------Products for sale----------------------");
  for (var i = 0; i < res.length; i++) { console.log(
      res[i].id +
        " | " +
        res[i].product +
        " | " +
        res[i].department +
        " | " +
        res[i].price +
        " | " +
        res[i].stock
    );
  }
  console.log("------------------------------------------------");
  ///customer prompts //
  inquirer
    .prompt([
      {
        type: "input",
        name: "whatpurchase",
        message:
          "What is the ID of the product that you would like to purchase?"
      },
      {
        type: "input",
        name: "howmany",
        message: "How many would you like?"
      }
    ])
    .then(function(answer) {
      //check store stock, in not enough stop order and display insufficient quantity
      // var itemID = answer.whatpurchase;
      connection.query(
        "SELECT * FROM products WHERE ?",
        { id: answer.whatpurchase },
        function(err, res) {
          if (err) throw err;
          var item = res[0];
          if (answer.howmany < item.stock) {
            //proceed with purchase
            var stockRemaining = item.stock - answer.howmany;
            var sale = answer.howmany * item.price;
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock: stockRemaining
                },
                {
                  id: answer.whatpurchase
                }
              ],
              function(err, res) {
                if (err) throw err;

                console.log("The total for your purchase is $" + sale + ".");

                console.log(
                  "Number of " + item.product + "(s) left: " + stockRemaining
                );
              }
            ); //end update products
          } else {
            // end of if its in stock
            console.log("Insufficient quantity.");
            return "Insufficient quantity.";
          } // end of else not enough

          // department logic here need total sales - add a column for this in the database then pull it for app display 
          				// put total cost into totalSales column for the related department

				connection.query('SELECT * FROM products WHERE ?', {department: item.department}, function(err, res ) {
          if (err) throw err;
  
          var total = sale + res[0].totalSales;
  
          connection.query('UPDATE products SET ? WHERE ?', [{
                  totalSales: total
              }, {
                  department: item.department
              }], function(err, res) {
              if (err) throw err;
              
              console.log(item.department + "'s total sales are: $" + total);
           }); // end of query update departments in product table 
  
          }); // end of connrvyion query for select department 

        }
      );
    }); //user prompt
}); //this is the connection function
