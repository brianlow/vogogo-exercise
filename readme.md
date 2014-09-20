Vogogo Development Exercise
===========================


Usage
-----

    npm install
    npm start


Other Commands
--------

    npm test        - run all test
    npm run watch   - run all tests and watch for changes


Questions
---------
- how to show discounts for "buy 1 get 1 free"?

	Apple 1 @ 0.50 = 0.50
	Apple 1 @ 0.00 = 0.00

	Apple 2 @ 0.50                =  1.00
		discount buy 1 get 1 free = -0.50

	Apple 2 @ 0.50                  =  0.75
		discount buy 1 get 1 @ 0.25 = -0.50


Todo
----
- document prices.yaml
- command line args: commander, nomnom, minimist, yargs
