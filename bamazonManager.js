var mysql = require("mysql"); 
var inquirer = require("inquirer"); 
require("console.table"); 

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
	chooseAction(); 
})

//start with viewSale, view lowInventory, addInventory, addProduct
function chooseAction() {
	inquirer
		.prompt({
			name: "action", 
			type: "rawlist", 
			message: "What do you want to do?", 
			choices: ["VIEW PRODUCTS", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PRODUCT", "QUIT"]
		})
		.then(function(ans) {
			if(ans.action.toUpperCase() ==="VIEW PRODUCTS") {
				viewProducts(); 
			} 
			else if (ans.action.toUpperCase() === "VIEW LOW INVENTORY") {
				viewLowInventory(); 
			}
			else if (ans.action.toUpperCase() === "ADD TO INVENTORY") {
				addInventory(); 
			}
			else if (ans.action.toUpperCase() === "ADD NEW PRODUCT") {
				addNewProduct();   
			}
			else {
				endConnection(); 
			}
		})
}

//view products for sale
function viewProducts() {
	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err; 
		console.table(res);
		chooseAction(); 
	})
}

//view low inventory
function viewLowInventory() {
	connection.query(
		"SELECT * FROM products WHERE stock_quantity < 20", 
		function(err, res) {
			if (err) throw err; 
			console.table(res);
			chooseAction(); 
		}
	);

}

//add to inventory
function addInventory() {
	connection.query("SELECT * FROM products", function(err, res) {
		inquirer
			.prompt([
			{
				name: "choice", 
				type: "list", 
				choices: function() {
					var choiceArray = []; 
					for (var i = 0; i < res.length; i++) {
						choiceArray.push(res[i].product_name);
					}
					return choiceArray;
				},
				message: "What product do you want to add inventory to?"
			},
			{
				name: "addQuantity", 
				type: "input", 
				message: "how many do you want to add to the stock?"
			}
			])
			.then(function(ans) { 
				var chosenItem;
		        for (var i = 0; i < res.length; i++) {
		          if (res[i].product_name === ans.choice) {
		            chosenItem = res[i];
		          }
		        } 
		        var newQuantity = parseInt(ans.addQuantity) + chosenItem.stock_quantity;
				connection.query(
				"UPDATE products SET ? WHERE ?",
				[
					{
						stock_quantity: newQuantity
					},
					{
						item_id: chosenItem.item_id
					}
				],
				function(error) {
					if (err) throw err; 
					console.log("stock quantity successfully uptdated to " + newQuantity); 
					chooseAction(); 
				}
			);
		});
	});
	

}

//add new product
function addNewProduct() {
	inquirer
		.prompt([
		{
			name: "product", 
			type: "input", 
			message: "Name of new product:"
		},
		{
			name: "department", 
			type: "input", 
			message: "Name of department:"
		},
		{
			name: "price", 
			type: "input", 
			message: "price of product (numerical only):"
		}, 
		{
			name: "stock", 
			type: "input", 
			message: "Quantity in stock: "
		}
		])
		.then(function(ans) {
			connection.query(
				"INSERT INTO products SET ?", 
				{
					product_name: ans.product, 
					department_name: ans.department, 
					price: ans.price, 
					stock_quantity: ans.stock
				},
				function(err,) {
					if (err) throw err; 
					console.log("your product was added successfully!");
					chooseAction(); 
				}
			);
		})
}

//end connection 
function endConnection() {
	connection.end(function(err) {
		if(err) throw err; 
		console.log("the session has been terminated");
	})
}









