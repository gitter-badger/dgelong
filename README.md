# Dgelong

***It's not ready for production. Stay tuned.***

Set of useful first-class structures which allow you to get rid of your developer's pain.

 * **Flatten** by default.
 * **Minimal API sufrace area**.
 * **Immutable**.
 * **Lazy evaluation**.
 * **Full interoperability** between all structures and JavaScript natives.

## Install

For ECMAScript 6 users

	npm install dgelong --save

For ECMAScript 5 (or less) users

	npm install dgelong-es5 --save

## Usage

*Note: [Babel](https://babeljs.io/) is used for transpiling Dgelong's sources.*

### ECMAScript 5

*Dgelong author highly recommends you to start using ECMAScript 6 in your project.*

You can start easily with project [Babel](https://babeljs.io/).

If you don't want to use Babel or **ECMAScript 6** I recommend you to [install](https://github.com/alexeyraspopov/dgelong-es5) `dgelong-es5`:

	var Dgelong = require('dgelong-es5');

So then you'll be able to use Dgelong's structures:

	var Maybe = Dgelong.Maybe,
		Just = Dgelong.Just,
		...;

### ECMAScript 6

You're able to import particular structures:

	import Either, {Success, Failure} from 'dgelong/either';
	import Maybe from 'dgelong/maybe';
	import compose from 'dgelong/compose';

## Time & Space

 - Time (`bind`, `subscribe`)
   - Future (async task as value)
   - Observable (async lists)
 - Space (`bind`, `lift`)
   - Maybe (null-safe computations)
   - Either (two-way composition)

## Maybe

	function square(n) {
	    return n * n;
	}

	function isEven(n) {
	    return n % 2 ? Nothing() : Just(n);
	}

	Just(5)
	    .bind(square) // returns Just(25)
	    .bind(isEven) // returns Nothing()
	    .bind(alert); // won't work

## Either

	function validateUserPassword(password) {
	    if (password.length < 10) return Failure('Password too short');
	    if (!/[0-9]/g.test(password)) return Failure('Password should contain numbers');

	    return Success(password);
	}

	validateUserPassword('boo')
	    .bind(savePassword, showError);

## Future

	function fetch(url) {
		return Future(function(resolve, reject) {
			var xhr = new XMLHttpRequest();

			xhr.onload = () => resolve(this.response);
			xhr.onerror = () => reject(this);

			xhr.open(url);
			xhr.send(null);

			return {
				dispose() { xhr.abort(); }
			};
		});
	}

	fetch('/products')
		.bind(products => ...)
		.subscribe(showProducts);

## Observable

	var clicks = Observable(function(next){
		document.addEventListener('click', next);

		return {
			dispose(){ document.removeEventListener('click', next); }
		};
	});

	clicks
		.map(event => event.target)
		.forEach(element => ...);

## License

[MIT (c) Alexey Raspopov](./LICENSE)
