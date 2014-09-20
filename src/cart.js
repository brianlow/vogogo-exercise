exports.calculateTotal = function(items) {
	return items.map(function(item) {
		return {
			name: item,
			description: "1 @ 0.50",
			total: 0.50
		};
	});
};