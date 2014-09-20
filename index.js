var readline = require('readline');
var cart = require("./src/cart.js");

var input = [];
var isInteractive = (process.stdin.isTTY === true);
var rl = readline.createInterface({
		input: process.stdin, 
		output: process.stdout,
		terminal: isInteractive,
	});


if (isInteractive) {
	console.log("");
	console.log("Welcome to the Vogogo Shopping Cart");
	console.log("-----------------------------------");
	console.log("Please enter your items, one per line.");
	console.log("When you are done enter a blank line.");
	console.log("");
}

rl.on('line', function(line) {
	if (isInteractive && line === "") {
		done();
	}
	input.push(line);
});

rl.on('close', function() {
	done();
});

function done() {
 	console.log(cart.calculateTotal(input));
 	process.exit();
}