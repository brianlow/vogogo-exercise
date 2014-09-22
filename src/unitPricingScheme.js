var _ = require("underscore");
var humanize = require("humanize-plus");

function create(item, price) {
	"use strict";

	function execute(remainingItems, receiptLines) {

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
	}

	function isMatch(i) {
		return (i + "").toUpperCase().trim() === item.toUpperCase();
	}

	function toString() {
		return item + " @ " + humanize.formatNumber(price, 2) + " each";
	}

	return {
		execute: execute,
		toString: toString
	};
}

module.exports = {
	create: create
};
