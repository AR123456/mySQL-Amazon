DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
  id INT NOT NULL
  AUTO_INCREMENT,
  product VARCHAR
  (100) NULL,
  department VARCHAR
  (100) NULL,
  price DECIMAL
  (10,2) NULL,
  stock INT NULL,
  PRIMARY KEY
  (id)
);

  USE bamazon;
  INSERT INTO products
    (product, department, price, stock)
  VALUES
    ("Swifer", "Home Goods", 12.99, 10);

  SELECT *
  FROM products;
 
