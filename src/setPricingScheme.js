var _ = require("underscore");
var humanize = require("humanize-plus");

function create(item, size, price) {
	"use strict";

	function execute(remainingItems, receiptLines) {

		while (hasSetOfItems(remainingItems)) {
			receiptLines.push({
				name: item,
				description: size + " for " + humanize.formatNumber(price, 2),
				amount: price
			});

			remainingItems = removeSetOfItems(remainingItems);
		}

		return {
			receiptLines: receiptLines,
			remainingItems: remainingItems
		};
	}

	function hasSetOfItems(remainingItems) {
		return _.filter(remainingItems, isMatch).length >= size;
	}

	function removeSetOfItems(remainingItems) {
		var numberRemoved = 0;
		return _.reject(remainingItems, function(item) {
			if (isMatch(item) && numberRemoved < size) {
				numberRemoved++;
				return true;
			}
			return false;
		});

	}

	function isMatch(i) {
		return (i + "").toUpperCase().trim() === item.toUpperCase();
	}

	function toString() {
		return item + " " + size + " for " + humanize.formatNumber(price, 2);
	}

	return {
		execute: execute,
		toString: toString
	};
}

module.exports = {
	create: create
};