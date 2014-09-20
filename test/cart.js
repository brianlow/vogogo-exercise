var assert = require("assert");
var cart = require("../src/cart.js");

describe('cart', function() {
	it('should lookup price for a single apple', function() {
		cart.calculateTotal(["Apple"]).should.eql([{
			name: "Apple",
			description: "1 @ 0.50",
			total: 0.50
		}]);
	});
});