var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Izzy24",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  customerStock();
  purchaseItem();
});

//Prints out the current inventory list without availble quantity.
function customerStock() {
  console.log("Here are all of the products available for purchase.\n");
  connection.query("SELECT id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    for (var j = 0; j < res.length; j++) {
      console.log(" Product: " + res[j].product_name + " Price: $" + res[j].price);
    }
    
  });
}; 


//Intializes user process flow. 
function purchaseItem() {
  // query the database for all items being sold
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    //A list of items to purchase. 
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What Which item would you like to buy?"
        },
        {
            name: "amount",
            type: "input",
            message: "How many would you like to purchase?"
        }
      ])
     
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var j = 0; j < results.length; j++) {
          if (results[j].product_name === answer.choice) {
            chosenItem = results[j];
          } 
        }
        // determine if enough stock is available for purchase
        if (chosenItem.stock_quantity > parseInt(answer.amount)) {
          //Enough stock available to complete the purchase
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem.stock_quantity - answer.amount
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("----------------------------------------")
              console.log("")
              console.log("")
              console.log("Purchase of completed!");
              console.log("Your Total is: $" + chosenItem.price * parseInt(answer.amount))
              console.log("")
              console.log("")
              console.log("----------------------------------------")
              connection.end();
            }
          );
        }
        else {
          //Not enough in stock 
          console.log("----------------------------------------")
          console.log("")
          console.log("")
          console.log("Stock is too low.");
          console.log("Current available stock for this product: " + chosenItem.stock_quantity);
          console.log("")
          console.log("")
          console.log("----------------------------------------")
          connection.end();
        }
      });
  });
};




