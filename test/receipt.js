var assert = require("assert");
var receipt = require("../src/receipt.js");

describe('receipt', function() {

	it('should generate receipt with one line', function() {

		var result = receipt.generate([{
			name: "Apple",
			description: "2 @ 0.50",
			amount: 0.50
		}]);

		result.should.be.eql([
			"Apple (2 @ 0.50)                     0.50",
			"---",
			"Total                                0.50",
		]);
	});

	it('should generate receipt with one line', function() {

		var result = receipt.generate([{
			name: "Apple",
			description: "2 @ 0.50",
			amount: 0.50
		}, {
			name: "Orange",
			description: "3 @ 10.30",
			amount: 10.30
		}]);

		result.should.be.eql([
			"Apple (2 @ 0.50)                     0.50",
			"Orange (3 @ 10.30)                  10.30",
			"---",
			"Total                               10.80"
		]);
	});

	it('should format amounts with thousands separator', function() {

		var result = receipt.generate([{
			name: "Apple",
			description: "a description",
			amount: 1111.50
		}]);

		result.should.be.eql([
			"Apple (a description)            1,111.50",
			"---",
			"Total                            1,111.50",
		]);
	});

	it('should return message if no receiptLines provided', function() {
		var result = receipt.generate([]);

		result.should.be.eql([
			"No items",
			"---",
			"Total                                0.00"
		]);
	});

});