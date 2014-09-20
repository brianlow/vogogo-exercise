/*jshint expr: true*/

var assert = require("assert");
var UnitPricer = require("../src/unitPricer.js");

describe('unitPricer', function() {

	describe('given a price for apples', function() {

		var pricer = new UnitPricer("Apple", 0.50);

		it('should lookup price for a single apple', function() {

			var result = pricer.apply(["Apple"]);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "1 @ 0.50",
				total: 0.50
			}]);
		});

		it('should lookup price for an apple with different case', function() {

			var result = pricer.apply(["aPpLe"]);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "1 @ 0.50",
				total: 0.50
			}]);
		});

		it('should lookup price for a two apples', function() {

			var result = pricer.apply(["Apple", "Apple"]);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "2 @ 0.50",
				total: 1.00
			}]);
		});

		it('should remove the apple from the remaining items', function() {

			var result = pricer.apply(["Apple", "Orange"]);

			result.remainingItems.should.be.eql(["Orange"]);
		});

		it('should not price the orange', function() {

			var result = pricer.apply(["Orange"]);

			result.receiptLines.should.be.empty;
		});

		it('should not remove the orange from remaining items', function() {

			var result = pricer.apply(["Orange"]);

			result.remainingItems.should.be.eql(["Orange"]);
		});

	});
});
