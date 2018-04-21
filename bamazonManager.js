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
    
    bamazonManager();
  });


function bamazonManager() {
    inquirer
        .prompt([
          {
            name: "action",
            type: "list",
            choices: ["View Current Stock", "View Low Inventory", "Update Quantity", "Add New Product"],
            message: "What action would you like to take?"
          }
        ])
        
        .then(function(answer) {
          if (answer.action === "View Current Stock") {
            managerInventory(); 
          }
          if (answer.action === "View Low Inventory") {
            lowInventory ();
          }
          if (answer.action === "Update Quantity") {
            addInventory();
          }
          if (answer.action === "Add New Product") {
            newProduct();
          }
        });
  }; 

function managerInventory() {
    console.log("Here is the current inventory.\n");
    connection.query("SELECT id, product_name, product_department, price, stock_quantity FROM products", function(err, res) {
      if (err) throw err;
      console.log("")
      console.log("----------------------------")
      console.log("")
  
      for (var j = 0; j < res.length; j++) {
        console.log("ID: " + res[j].id + " | Product: " + res[j].product_name + " | Product Department: " +res[j].product_department + " | Price: $" + res[j].price + " | Quantity on Hand: " + res[j].stock_quantity);
      }
    });
}

function lowInventory() {

    console.log("");
    console.log("");
    console.log("Here are all of the products that have less than 5 units in stock.\n");
  
    connection.query("SELECT id, product_name, product_department, price, stock_quantity FROM products WHERE stock_quantity < 5", function(err, res) {
      if (err) throw err;
    
      for (var k = 0; k < res.length; k++) {
        console.log("ID: " + res[k].id + " | Product: " + res[k].product_name + " | Quantity: " + res[k].stock_quantity);
        }
        if(res.length === 0) {
          console.log("Current stock is suffcient"); 
        }
    });
  
  };

function newProduct() {
    // Add new item
    inquirer
      .prompt([
        {
          name: "product",
          type: "input",
          message: "New Product name?"
        },
        {
            name: "department",
            type: "input",
            message: "Product department?"
        },
        {
          name: "price",
          type: "input",
          message: "Price?"
        },
        {
          name: "quantity",
          type: "input",
          message: "Quantity?",
        }
      ])
      .then(function(answer) {
        connection.query(
          "INSERT INTO products SET ?",
          {
            product_name: answer.product,
            product_department: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
          },
          function(err) {
            if (err) throw err;
            console.log("New Product successfully added.");
          }
        );
      });
  }

  function addInventory() {
   
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        //A list of items. 
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
              message: "What item would you like to update?"
            },
            {
                name: "amount",
                type: "input",
                message: "How much would you like to add?"
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
                //update
                connection.query(
                  "UPDATE products SET ? WHERE ?",
                  [
                    {
                      stock_quantity: chosenItem.stock_quantity + parseInt(answer.amount)
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
                    console.log("Quantity Updated!")
                    console.log("")
                    console.log("")
                    console.log("----------------------------------------")
                  }
                );
              
    
          });
      });

    } 
  
  