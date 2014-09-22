var _ = require("underscore");
var readline = require('readline');
var fs = require("fs");
var os = require("os");
var cart = require('./src/cart.js');

var items = [];
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
	items.push(line);
});

rl.on('close', function() {
	done();
});

function done() {
	
	var pricingSchemeList = fs.readFileSync("pricingSchemeList.yaml");
	
	var lines = cart.calculate(pricingSchemeList, items);

	console.log(lines.join(os.EOL));

 	process.exit();
}