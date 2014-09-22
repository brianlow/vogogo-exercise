//
// This file is a meta-suite, it loads test cases from text files in the examples/ subfolder.
// Each file contains three sections: prices, items and expected output. The sections are 
// delimited by a blank line. Lines starting with hash (#) are comments. This code will create
// and run a mocha test for each file.
//
var fs = require("fs");
var _ = require("underscore");
var should = require("should");
var cart = require("../src/cart.js");

describe('examples', function() {

	var filenames = fs.readdirSync("./test/examples/");
	_.each(filenames, function(filename) {

		it(filename, function() {

			var example = parse(filename);

			var actual = cart.calculate(example.priceListFile, example.items);

			actual.should.be.eql(example.expected);

		});

	});

});

function parse(filename) {
	var file = fs.readFileSync("./test/examples/" + filename, "utf8");
	var lines = file.toString().split("\r\n");

	lines = _.reject(lines, isComment);
	var groups = splitOnBlankLine(lines);

	return {
		priceListFile: groups[0].join("\r\n"),
		items: groups[1],
		expected: groups[2]
	};
}

function splitOnBlankLine(lines) {
	var groups = [];
	var i = 0;

	lines.reverse();
	while (lines.length > 0) {
		var line = lines.pop();
		if (isBlank(line)) {
			i++;
		} else {
			if (!groups[i]) {
				groups[i] = [];
			}
			groups[i].push(line);
		}
	}
	return groups;
}

function isBlank(line) {
	return (line + "").trim() === "";
}

function isComment(line) {
	return (line + "").trim().substr(0, 1) === "#";
}