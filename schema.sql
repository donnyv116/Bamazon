Drop database if exists bamazonDB;

create database bamazonDB;

use bamazonDB;

create table products(
	id mediumint(11) auto_increment not null,
    product_name varchar(100) not null,
    department_name varchar(50) not null,
    price decimal(10,2) not null,
    stock_qty integer(10) not null,
    primary key(id)
);


insert into products(product_name, department_name, price, stock_qty)
values("Star Wars", "Entertainment", 15.50, 22),
	("Snatch", "Entertainment", 12.50, 200),
	("T-Shirt", "Clothing", 15.00, 1000),
	("Sweet Kicks", "Clothing", 150.50, 15),
	("Can Opener", "Home", 1.50, 350),
	("Pillow", "Home", 5.50, 300),
	("Dog bed", "Pet", 20.50, 57),
	("Desktop Cornhole", "Games", 10.50, 275),
	("Four Brothers", "Entertainment", 12.50, 36),
	("Edge of Tomorrow", "Entertainment", 15.50, 406);

select * from products;



