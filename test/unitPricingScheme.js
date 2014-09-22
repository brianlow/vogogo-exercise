/*jshint expr: true*/

var assert = require("assert");
var unitPricingScheme = require("../src/unitPricingScheme.js");

describe('unitPricingScheme', function() {

	describe('given a price for apples', function() {

		var pricingFunction = unitPricingScheme.makePricingFunction("Apple", 0.50);

		it('should lookup price for a single apple', function() {

			var result = pricingFunction(["Apple"], []);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "1 @ 0.50",
				amount: 0.50
			}]);
		});

		it('should lookup price for an apple with different case and whitespace', function() {

			var result = pricingFunction([" aPpLe "], []);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "1 @ 0.50",
				amount: 0.50
			}]);
		});

		it('should lookup price for two apples', function() {

			var result = pricingFunction(["Apple", "Apple"], []);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "2 @ 0.50",
				amount: 1.00
			}]);
		});

		it('should remove the apple from the remaining items and leave the orange', function() {

			var result = pricingFunction(["Apple", "Orange"], []);

			result.remainingItems.should.be.eql(["Orange"]);
		});

		it('should not price the orange', function() {

			var result = pricingFunction(["Orange"], []);

			result.receiptLines.should.be.empty;
		});

		it('should not touch any existing receiptLines', function() {

			var existingReceiptLine = {
				name: "Pear",
				description: "1 @ 0.25",
				amount: 1.00
			};

			var result = pricingFunction([], [existingReceiptLine]);

			result.receiptLines.should.be.eql([existingReceiptLine]);
		});

	});
});