Vogogo Development Exercise
===========================


Usage
-----

    npm start

	Welcome to the Vogogo Shopping Cart
	-----------------------------------
	Please enter your items, one per line.
	When you are done enter a blank line.

	apple
	apple
	apple
	orange

	Apple (3 for 1.30)                   1.30
	Orange (1 @ 0.80)                    0.80
	---
	Total                                2.10

To changes prices, see pricingSchemeList.yaml.

You can also pipe in a list of items:

	echo apple > mylist
	echo apple >> mylist
	echo orange >> mylist
	cat mylist | node index.js

	Apple (2 @ 0.50)                     1.00
	Orange (1 @ 0.80)                    0.80
	---
	Total                                1.80


Setup
-----

- [install node and npm](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager) (note on some unix distributions, the default repository has really old versions of node)
- clone repository
- `npm install`



Other Commands
--------------

    npm test        - lint, run all test
    npm run watch   - lint, run all tests and watch for changes
    npm run lint    - lint


Future Improvements
---------------------
- when loading prices, not OCP for new pricing schemes
- price list requires user to place schemes in specific order
- pass pricing filename as command line argument
- native support for "buy one get one free" pricing
