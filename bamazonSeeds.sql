DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  product_department VARCHAR(45) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, product_department, price, stock_quantity)
VALUES ("throw pillow", "home", 10, 20);

INSERT INTO products (product_name, product_department, price, stock_quantity)
VALUES ("iphone 8", "electronics", 800, 100);

INSERT INTO products (product_name, product_department, price, stock_quantity)
VALUES ("macbook pro", "electronics", 1400, 10);

INSERT INTO products (product_name, product_department, price, stock_quantity)
VALUES ("couch", "home", 650, 4;
I
INSERT INTO products (product_name, product_department, price, stock_quantity)
VALUES ("guitar", "musical instruments", 400, 7);

INSERT INTO products (product_name, product_department, price, stock_quantity)
VALUES ("ukulele", "musical instruments", 100, 5);

INSERT INTO products (product_name, product_department, price, stock_quantity)
VALUES ("guitar", "musical instruments", 400, 7);

INSERT INTO products (product_name, product_department, price, stock_quantity)
VALUES ("red wine", "food and beverage", 15, 200);

INSERT INTO products (product_name, product_department, price, stock_quantity)
VALUES ("white", "food and beverage", 15, 175);

INSERT INTO products (product_name, product_department, price, stock_quantity)
VALUES ("smoked salmon", "food and beverage", 12, 60);

