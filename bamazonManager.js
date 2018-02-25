var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "midnight1",
	database: "bamazon"
  });
// connect to database
connection.connect(function(err) {
	if (err) throw err;
	// console.log('\nconnected as id ' + connection.threadId);
// list of answer choices for switch case 
inquirer.prompt({
	name: "choice",
	type: "list",
	message: "Would you like to:",
	choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add a New Product"]
}).then(function(answer) {
	// switch case functions
	switch(answer.choice) {
		case 'View Products for Sale': 
			productsForSale();
			break;
		case 'View Low Inventory':
			lowInventory();
			break;
		case 'Add to Inventory':
			addInventory();
			break;
		case 'Add a New Product':
			newProduct();
			break;
	} // end of switch case
}); // end inquirer prompt 

// products function - display all 
function productsForSale() {
	connection.query('SELECT * FROM products', function(err, res) {
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
	});
}; // end of productsForSale function
// use if stock is less than 5
function lowInventory() {
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;
		for (i = 0; i < res.length; i++) {
			if (res[i].stock < 5) {
				// log the number of the low quantity item left
				console.log("\x1b[31m%s\x1b[0m","Low Inventory only " + res[i].stock + " " + res[i].product + " left!");
			} 
		} // end of for loop 
	}); 
}; // end of lowInventory function
// Add to Inventory function e
function addInventory() {
	inquirer.prompt([
		{
		type: "input",
		message: "What is the itemID of the product you would like to add to stock ?",
		name: "id"
	}, {
		type: "input",
		message: "How many more of the product would you like to add to stock?",
		name: "amount"
	}]).then(function(answers) {

		var idOfItem = answers.id;
		var increaseInventory = parseInt(answers.amount);
		connection.query('SELECT * FROM products WHERE ?', {
			id: idOfItem}, function(err, res) {
				if (err) throw err;
				var item = res[0];
				var newInventoryAmount = increaseInventory + item.stock;
				connection.query('UPDATE products SET ? WHERE ?', [{
					stock: newInventoryAmount
					}, {
					id: idOfItem
				}], function(err,res) {
					console.log('There are now ' + newInventoryAmount + ' ' + item.product + ' in stock.');
				}); 
		}); // end of query SELECT 
	}); 
}; // end of addInventory function
// Add New Product function 
function newProduct() {
	inquirer.prompt([{
		type: "input",
		message: "What product do you want to add to the store?",
		name: "pName"
	}, {
		type: "input",
		message: "What department will sell it?",
		name: "dName"
	}, {
		type: "input",
		message: "What is the price ?",
		name: "price"
	}, {
		type: "input",
		message: "How many do you want to add to stock?",
		name: "stock"
	}]).then(function(answers) {

		var product = answers.pName;
		var department = answers.dName;
		var price = answers.price;
		var stock = answers.stock;

		connection.query('INSERT INTO products (product, department, price, stock) VALUES (?, ?, ?, ?)', [product, department, price, stock], function(err, res) {

			console.log("You now have "+stock+" " + product + " in the store.");
		}); 
	}); 
}; // end of newProduct function
}); // end of connection to the db