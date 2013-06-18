require('./../../test');

var NodeStorage;

describe('NodeStorage - In memory storage engine', function() {

	beforeEach(function() {
		NodeStorage = require(libpath + '/storage/node');
	});

	it('should be a valid storage interface', function() {
		assert.typeOf(NodeStorage.set, 'function');
		assert.typeOf(NodeStorage.get, 'function');
		assert.typeOf(NodeStorage.remove, 'function');
	});

	describe('NodeStorage.set', function() {

		it('should return false if an invalid key is provided', function() {

			var result = NodeStorage.set({}, 'test');

			assert.isFalse(result);

		});

		it('should accept 2 arguments: key, value, ttl', function() {

			var key = 'testKey',
				value = {'object' : 'value'},
				result = NodeStorage.set(key, value);

			assert.isTrue(result);			

		});

		it('should accept 3 arguments: key, value, ttl', function() {

			var key = 'testKey',
				value = {'object' : 'value'},
				ttl = 5,
				result = NodeStorage.set(key, value, ttl);

			assert.isTrue(result);

		});

	});

	describe('NodeStorage.get', function() {

		it('should return null if an invalid key is provided', function() {

			var result = NodeStorage.get({}, 'test');

			assert.isFalse(result);

		});

		it('should accept argument: key', function() {

			var key = 'testKey',
				value = {'object' : 'value'};
				
			NodeStorage.set(key, value);
			var result = NodeStorage.get(key);

			assert.equal(value, result);	

		});

	});

	describe('NodeStorage.remove', function() {

		it('should remove the specified key', function() {

			var key = 'testKey',
				value = 'testValue';

			NodeStorage.set(key, value);

			NodeStorage.remove(key);

			var result = NodeStorage.get(key);

			assert.isFalse(result);

		})

	});

});