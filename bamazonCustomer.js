//required NPMs
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

connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  console.log("----------Products for sale----------------------");
  for (var i = 0; i < res.length; i++) {
    console.log(
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
            );
          } else {
            console.log("Insufficient quantity.");
            return "Insufficient quantity.";
          }

          connection.query(
            "SELECT * FROM products WHERE ?",
            { department: item.department },
            function(err, res) {
              if (err) throw err;
              var total = sale + res[0].totalSales;
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    totalSales: total
                  },
                  {
                    department: item.department
                  }
                ],
                function(err, res) {
                  if (err) throw err;

                  console.log(
                    item.department + "'s total sales are: $" + total
                  );
                }
              ); 
            }
          ); /
        }
      );
    }); 
});
