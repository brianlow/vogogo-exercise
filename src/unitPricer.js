var _ = require("underscore");

function UnitPricer(item, price) {
	"use strict";
	
	this.apply = function(items) {

		var numberMatching = _.filter(items, isMatch).length;
		var remainingItems = _.reject(items, isMatch);
		var receiptLines = [];

		if (numberMatching > 0) {
			receiptLines = [{
				name: item,
				description: numberMatching + " @ 0.50",
				total: price * numberMatching
			}];
		}

		return {
			receiptLines: receiptLines,
			remainingItems: remainingItems
		};
	};

	function isMatch(i) {
		return (i+"").toUpperCase() === item.toUpperCase();
	}
}

module.exports = UnitPricer;