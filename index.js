var _ = require("underscore");
var readline = require('readline');
var priceList = require('./src/priceList.js');
var receipt = require("./src/receipt.js");

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
	
	var pricingSchemes = priceList.load("priceList.yaml");
	
	var context = {
		remainingItems: items,
		receiptLines: []
	};

	_.each(pricingSchemes, function(pricingScheme) {
		context = pricingScheme.execute(context.remainingItems, context.receiptLines);
	});

	var lines = receipt.format(context.receiptLines);

 	_.each(lines, function (line) {
 		console.log(line);
 	});

 	process.exit();
}