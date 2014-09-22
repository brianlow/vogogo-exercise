/*jshint expr: true*/

var unitPricingScheme = require("../src/unitPricingScheme.js");

describe('unitPricingScheme', function() {

	describe('given a price for apples', function() {

		var pricingScheme = unitPricingScheme.create("Apple", 0.50);

		it('should lookup price for a single apple', function() {

			var result = pricingScheme.execute(["Apple"], []);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "1 @ 0.50",
				amount: 0.50
			}]);
		});

		it('should lookup price for an apple with different case and whitespace', function() {

			var result = pricingScheme.execute([" aPpLe "], []);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "1 @ 0.50",
				amount: 0.50
			}]);
		});

		it('should lookup price for two apples', function() {

			var result = pricingScheme.execute(["Apple", "Apple"], []);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "2 @ 0.50",
				amount: 1.00
			}]);
		});

		it('should remove the apple from the remaining items and leave the orange', function() {

			var result = pricingScheme.execute(["Apple", "Orange"], []);

			result.remainingItems.should.be.eql(["Orange"]);
		});

		it('should not price the orange', function() {

			var result = pricingScheme.execute(["Orange"], []);

			result.receiptLines.should.be.empty;
		});

		it('should not touch any existing receiptLines', function() {

			var existingReceiptLine = {
				name: "Pear",
				description: "1 @ 0.25",
				amount: 1.00
			};

			var result = pricingScheme.execute([], [existingReceiptLine]);

			result.receiptLines.should.be.eql([existingReceiptLine]);
		});

		it('should describe itself with toString', function() {

			pricingScheme.toString().should.be.eql("Apple @ 0.50 each");
		});

	});
});