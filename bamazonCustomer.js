var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	user: "root",
	host: "localhost",
	port: 3306,
	password: "root",
	database: "bamazonDB"
})

function initialize(){
	connection.query('select * from products', function(err, res){

		if(err) throw err;

		console.log('* * * WELCOME TO BAMAZON * * * \n===================================')
	for (var i = 0; i < res.length; i++) {
		console.log("ID#: " + res[i].id + " | " + "Procuct: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " |" + "Price: "  + res[i].price + " | " + "QTY: " + res[i].stock_qty);
		console.log('-----------------------------------------------------------------------------------')	
	}

	console.log(' ');
	inquirer.prompt([
	{
		type: "inqut",
		name: "id",
		message: "What is the ID of the product you would like to purchase?",
		validate: function(value){
			if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
				return true;
			} else{
				return false;
			}
		}
	},
	{
		type: "input",
		name: "qty",
		message: "How many would you like to purchase?",
		validate: function(value){
			if(isNaN(value)){
				return false;
			} else{
				return true;
			}
		}
	}
		]).then(function(ans){
			var toBuy = (ans.id)-1;
			var qtyToBuy = parseInt(ans.qty);
			var grandTotal = parseFloat(((res[toBuy].price)*qtyToBuy).toFixed(2));
		

		if(res[toBuy].stock_qty >= qtyToBuy){

			connection.query("update products set ? where ?",[
				{stock_qty: (res[toBuy].stock_qty - qtyToBuy)},
				{id: ans.id}
				], function(err, result){
					if (err) throw err;
					console.log("\nSOLD! Your total is $" + grandTotal.toFixed(2) + "\nYour item(s) will ship next August; \n*Must be home between 8 AM and 10 PM");
				});

			} else{
				console.log("Sorry, there's not enough in stock!")
			}
				reprompt();
			});
		});
	}

function reprompt(){
	inquirer.prompt([{
		type: "confirm",
		name: "reply",
		message: "Would you like to purchase another item?"
	}]).then(function(ans){
		if(ans.reply){
			initialize();
		}else{
			console.log("Thank You! Come again!")
		}
	});
}

initialize();

 