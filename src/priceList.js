var fs = require('fs');
var yaml = require('js-yaml');
var _ = require("underscore");
var unitPricingScheme = require("./unitPricingScheme.js");

function parse(s) {
	"use strict";

	var doc = yaml.safeLoad(s);

	return _.chain(doc)
		.map(parseLine)
		.reject(isNullOrUndefined)
		.value();
}

function parseLine(line) {
	if ((line.scheme + "").toLowerCase().trim() == "unit") {
		return unitPricingScheme.create(line.item, line.price);
	}
}

function isNullOrUndefined(obj) {
	return !obj;
}

module.exports = {
	parse: parse
};