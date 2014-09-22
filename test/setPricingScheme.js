/*jshint expr: true*/

var setPricingScheme = require("../src/setPricingScheme.js");

describe('setPricingScheme', function() {

	describe('given a price for 3 apples', function() {

		var pricingScheme = setPricingScheme.create("Apple", 3, 1.30);

		it('should lookup price for 3 apples', function() {

			var result = pricingScheme.execute(["Apple", "Apple", "Apple"], []);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "3 for 1.30",
				amount: 1.30
			}]);
		});

		it('should lookup price for 3 apples with different case and whitespace', function() {

			var result = pricingScheme.execute([" aPpLe ", "apple", "Apple"], []);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "3 for 1.30",
				amount: 1.30
			}]);
		});

		it('should not apply to 2 apples because it is smaller than the set size', function() {

			var result = pricingScheme.execute(["Apple", "Apple"], []);

			result.receiptLines.should.be.empty;
			result.remainingItems.should.be.eql(["Apple", "Apple"]);
		});

		it('should lookup price for 6 apples', function() {

			var result = pricingScheme.execute(["Apple", "Apple", "Apple", "Apple", "Apple", "Apple"], []);

			result.receiptLines.should.eql([{
				name: "Apple",
				description: "3 for 1.30",
				amount: 1.30
			}, {
				name: "Apple",
				description: "3 for 1.30",
				amount: 1.30
			}]);
		});

		it('should remove the 3 apples from the remaining items and leave the oranges', function() {

			var result = pricingScheme.execute(["Apple", "Apple", "Apple", "Orange", "Orange", "Orange"], []);

			result.remainingItems.should.be.eql(["Orange", "Orange", "Orange"]);
		});

		it('should not price the orange', function() {

			var result = pricingScheme.execute(["Orange", "Orange", "Orange"], []);

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

			pricingScheme.toString().should.be.eql("Apple 3 for 1.30");
		});

	});
});