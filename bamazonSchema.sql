DROP DATABASE IF EXISTS bamazon_db; 
CREATE DATABASE bamazon_db; 

USE bamazon_db; 

CREATE TABLE products (
	item_id INTEGER(15) AUTO_INCREMENT NOT NULL, 
	product_name VARCHAR(200) NOT NULL, 
	department_name VARCHAR(100), 
	price DECIMAL(10,2), 
	stock_quantity INTEGER(15),
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
	('Epic All Natural Meat Bar, 100% Grass Fed, Bison,Uncured Bacon and Cranberry, 1.3 ounce bar, (Pack of 12)',
	 'Grocery and Gourmet Food', 25.99, 100), 
	 ('Morning Song 11341 Cardinal Wild Bird Food, 20-Pound', 'Patio, Lawn, & Garden', 24.05, 215), 
	 ('PUR 4-Pack Pur 2-Stage Water Pitcher Replacement Filter', 'Home & Kitchen', 21.22, 50 ),
	 ('Seasons Sentry CVP01434 Adirondack Chair Cover, Sand', 'Patio, Lawn, & Garden', 21.99, 34), 
	 ('Modern Innovations 16 Inch Stainless Steel Magnetic Knife Bar with Multi-Purpose Functionality as a Knife Holder, Knife Strip, Magnetic Tool Organizer, Art Supply Organizer & Home Organizer',
	 	'Home & Kitchen', 16.95, 5), 
	 ('Hiware Good Heavy Duty Pecan Nut Cracker Tool with 4 Picks, Wood Base & Handle', 'Home & Kitchen', 17.99, 89), 
	 ('MRS MEYERS Liquid Dish Soap, Lemon Verbena, 16 Fluid Ounce, Pack of 3', 'Health & Household', 11.07, 66), 
	 ('Jenga Classic Game', 'Toys & Games', 10.27, 23), 
	 ('Marcato Atlas Pasta Machine, Made in Italy, Stainless Steel, Includes Pasta Cutter, Hand Crank, and Instructions', 'Home & Kitchen', 63.00, 3), 
	 ('GUND Pusheen 12 oz Mug', 'Home & Kitchen', 12.81, 500); 


SELECT * FROM products;

