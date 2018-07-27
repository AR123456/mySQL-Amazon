# mySQL-Amazon

A NodeJS and MySQL app

# Node.js & MySQL

## Customer App Description

This app is an Amazon-like storefront using NodeJS and MySQL. The app will take in orders from customers and deplete stock from the store's inventory.
Each product is tracked in a MySQL database in a products table. The product, department, price and stock are kept in the table and updated with JavaScript through customer input.
The app will track product sales in the store's departments and provide a summary of the highest-grossing department.

Please see the included screen shots of phases of the application including the customer view, display when a customer orders more than the available quantity and a summary of the highest grossing department.

To run the app type bamazonCustomer.js at the Node prompt.
The customer will be presented with a prompt asking them the ID of the product they would like to buy and another asking the quantity. If the store has an insufficient quantity to fill the order, the customer will be told that and the transaction will not go through. When a purchase is made, the total cost of the purchase will be displayed,the database will be updated and the new remaining quantity displayed.
#### Screen shots :
# Customer-View
![Customer-View](https://github.com/AR123456/mySQL-Amazon/blob/master/screen-shots/Customer-View.gif?raw=true "Customer View ")
# Products-View
![Products-menu](https://github.com/AR123456/mySQL-Amazon/blob/master/screen-shots/products-menu-after-purchase.gif?raw=true "Products Menu")

# Highest Gross Department
![highest-gross-dept](https://github.com/AR123456/mySQL-Amazon/blob/master/screen-shots/highest-gross-dept.gif?raw=true "Highest Grossing Department")

# Insufficient Quantity
![insufficient-quantity](https://github.com/AR123456/mySQL-Amazon/blob/master/screen-shots/insufficient-quantity.gif?raw=true "Insufficient Quantity")

# Database View
![database-view](https://github.com/AR123456/mySQL-Amazon/blob/master/screen-shots/DB-After-Import.gif?raw=true "Database View ")

### Manager View description

This module of the app will supply a view for the store manager. When launched the manager will be presented with a menu with option to view what is for sale or items with an inventory lower than 5. Two additional menu items will add existing products or a new one.

Please see the included screen shots of phases of the application including the menu, View Products for Sale results, View Low Inventory results, Add to Inventory and Add to Inventory functionality.  
To run the app type bamazonManager.js at the Node prompt.
If the manager selects View Products for Sale, the app lists every available item, the item IDs, names, prices and number in stock.
If the manager selects View Low Inventory, they will see a list all items with an inventory count lower than five.
If the manager selects Add to Inventory,they will be presented with prompts to select the item and quantity to add.
If the manager selects Add to Inventory,they will be prompted to add the new product to the store.
## Screen shots:

# Manager Menu
![Manager Menu](https://github.com/AR123456/mySQL-Amazon/blob/master/screen-shots/manager-menu.gif?raw=true "Manager Menu")
# View Products for Sale
![Products for Sale](https://github.com/AR123456/mySQL-Amazon/blob/master/screen-shots/products-for-sale.gif?raw=true "Products for Sale ")
# View Low Inventory
![Low Inventory](https://github.com/AR123456/mySQL-Amazon/blob/master/screen-shots/low-inventory.gif?raw=true "Low Inventory")
# Add to Inventory
![Add to Inventory](https://github.com/AR123456/mySQL-Amazon/blob/master/screen-shots/add-to-inventory.gif?raw=true "Add to Inventory")
# Add to Inventory- New Product
![Add New Product ](https://github.com/AR123456/mySQL-Amazon/blob/master/screen-shots/add-new-product.gif?raw=true "Add New Product")
