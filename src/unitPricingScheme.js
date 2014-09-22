var _ = require("underscore");
var humanize = require("humanize-plus");

function makePricingFunction(item, price) {
	"use strict";

	return function(remainingItems, receiptLines) {

		var numberOfMatchingItems = _.filter(remainingItems, isMatch).length;

		if (numberOfMatchingItems > 0) {
			receiptLines.push({
				name: item,
				description: numberOfMatchingItems + " @ " + humanize.formatNumber(price, 2),
				amount: price * numberOfMatchingItems
			});
		}

		return {
			receiptLines: receiptLines,
			remainingItems: _.reject(remainingItems, isMatch)
		};
	};

	function isMatch(i) {
		return (i + "").toUpperCase().trim() === item.toUpperCase();
	}
}

module.exports.makePricingFunction = makePricingFunction;