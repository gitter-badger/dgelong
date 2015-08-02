var Monad = require('./monad');

function run(tasks, value) {
	while (tasks.length) setTimeout(tasks.shift(), 0, value);
}

function pendingValue(producer) {
	var isPending = true, value, pending = [];

	producer(function(result) {
		isPending = false;
		value = result;

		run(pending, value);
	}, function(error) {
		// TODO: implement left part
	});

	return function(next) {
		if (isPending) {
			pending.push(next);
		} else {
			run([next], value);
		}
	};
}

function flatten(value, right, left) {
	if (Monad.isMonad(value)) {
		return value.bind(right, left);
	} else {
		return right(value);
	}
}

function Future(producer) {
	var wrappedProducer = pendingValue(producer);

	return {
		isMonad: true,
		bind: function(right) {
			return Future(function(resolve, reject) {
				wrappedProducer(function(value) {
					flatten(right(value), resolve, reject);
				});
			});
		}
	};
}

// exports.Resolve = Resolve;
// exports.Reject = Reject;
exports.Future = Future;
