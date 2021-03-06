/*jshint expr: true*/

var pricingSchemeList = require("../src/pricingSchemeList.js");

describe('pricingSchemeList', function() {

	it('should parse unit pricing scheme', function() {

		var pricingSchemes = pricingSchemeList.parse("- {scheme: unit, item: Apple, price: 0.5}");

		pricingSchemes.map(toString).should.be.eql(["Apple @ 0.50 each"]);

	});

	it('should parse set pricing scheme', function() {

		var pricingSchemes = pricingSchemeList.parse("- {scheme: set, item: Apple, size: 3, price: 1.30}");

		pricingSchemes.map(toString).should.be.eql(["Apple 3 for 1.30"]);

	});

	it('should parse pricing scheme with space in the name', function() {

		var pricingSchemes = pricingSchemeList.parse("- {scheme: unit, item: 'Mandarin Orange', price: 1.25}");

		pricingSchemes.map(toString).should.be.eql(["Mandarin Orange @ 1.25 each"]);

	});

	it('should skip unknown pricing scheme', function() {

		var pricingSchemes = pricingSchemeList.parse("- {scheme: unknown}");

		pricingSchemes.map(toString).should.be.empty;

	});

	it('should ignore comments', function() {

		var pricingSchemes = pricingSchemeList.parse("# a comment");

		pricingSchemes.should.be.empty;

	});

	it('should ignore blank lines', function() {

		var pricingSchemes = pricingSchemeList.parse("  ");

		pricingSchemes.should.be.empty;

	});

	function toString(obj) {
		if (!obj) {
			return null;
		}
		return obj.toString();
	}

});