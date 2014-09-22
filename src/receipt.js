var _ = require("underscore");
var humanize = require("humanize-plus");
var sprintf = require("sprintf-js").sprintf;

function format(receiptLines) {

	var FORMAT = "%-30s %10s";
	var total = sum(receiptLines);
	var lines = [];

	if (receiptLines.length === 0) {
		lines.push("No items");
	}

	_.each(receiptLines, function(receiptLine) {
		lines.push(sprintf(FORMAT, receiptLine.name + " (" + receiptLine.description + ")", humanize.formatNumber(receiptLine.amount, 2)));
	});

	lines.push("---");
	lines.push(sprintf(FORMAT, "Total", humanize.formatNumber(total, 2)));

	return lines;
}

function sum(receiptLines) {
	return _.reduce(receiptLines, function(memo, receiptLine) {
		return memo + receiptLine.amount;
	}, 0);
}

module.exports = {
	format: format
};