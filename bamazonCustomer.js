var mysql = require("mysql"); 
var inquirer = require("inquirer"); 
require("console.table"); 
var totalPriceArr = []; 

var connection = mysql.createConnection({
	host: "localhost", 
	port: 8889, 
	user: "root", 
	password: "root", 
	database: "bamazon_db"
}); 

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as " + connection.threadId); 
	start(); 
})

function start() {
	displayProducts(); 
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err; 
		inquirer
			.prompt([
				{
					name: "choice", 
					type: "input", 
					message: "Please enter the ID of the product you would like to order"
				}, 
				{
					name: "quantity", 
					type: "input", 
					message: "How many would you like to purchase?"
				}
			])
			.then(function(answer) {
				var id = parseInt(answer.choice);  
				var inStock = res[id - 1].stock_quantity; 
				var orderQuantity = parseInt(answer.quantity);
				var totalPrice = (res[id-1].price) * orderQuantity; 
   
				if (orderQuantity <= inStock) {
					connection.query(
						"UPDATE products SET ? WHERE ?", 
						[
							{
								stock_quantity: (inStock - orderQuantity) 
							}, 
							{
								item_id: answer.choice
							}
						], 
						function(error) {
							if (error) throw err;

							totalPriceArr.push(totalPrice); 
							var grandTotal = 0;
							for (var i = 0; i < totalPriceArr.length; i++) {
								grandTotal += totalPriceArr[i]; 
							}

			 				console.log("Order placed successfully!"); 
							console.log("TOTAL FOR THIS ITEM: $" + totalPrice.toFixed(2));
							console.log("GRAND TOTAL: $" + grandTotal.toFixed(2)); 
							chooseNext(); 
							}
						);
				}
				else {
					console.log("Sorry, your order could not be placed! Insufficient quantity in stock."); 
					chooseNext(); 
				}

			});
	})

}

function displayProducts() {
	connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
		if (err) throw err; 
		console.table(res);
	});
}



function chooseNext() {
	inquirer.
		prompt({
			name: "action", 
			type: "rawlist", 
			choices: ["Place another order", "Quit"], 
			message: "What would you like to do next?"
		})
		.then(function(answer) {
			if (answer.action === "Place another order") {
				start(); 
			}
			else {
				connection.end(function(err) {
					if(err) throw err; 
					console.log("Thank you for ordering with Bamazon. Have a great day!");
				});
				
			}
		});
}












