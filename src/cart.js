var _ = require("underscore");
var receipt = require("./receipt.js");
var priceList = require('./priceList.js');

function calculate(priceListFile, items) {
	var context = {
		remainingItems: items,
		receiptLines: []
	};

	var pricingSchemes = priceList.parse(priceListFile);

	_.each(pricingSchemes, function(pricingScheme) {
		context = pricingScheme.execute(context.remainingItems, context.receiptLines);
	});

	if (context.remainingItems.length > 0) {
		return ["Cannot create receipt, no price for " + (context.remainingItems[0]) + "."];
	}

	var lines = receipt.format(context.receiptLines);

	return lines;
}

module.exports = {
	calculate: calculate
};