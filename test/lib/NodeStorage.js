require('./../test');

var NodeStorage = require(libpath + '/NodeStorage'),
	storage = new NodeStorage();

describe('NodeStorage - In memory storage engine', function() {

	it('should be a valid storage interface', function() {
		assert.typeOf(storage.set, 'function');
		assert.typeOf(storage.get, 'function');
		assert.typeOf(storage.remove, 'function');
	});

	describe('NodeStorage.set', function() {

		it('should return false if an invalid key is provided', function() {

			var result = storage.set({}, 'test');

			assert.isFalse(result);

		});

		it('should accept 2 arguments: key, value, ttl', function() {

			var key = 'testKey',
				value = {'object' : 'value'},
				result = storage.set(key, value);

			assert.isTrue(result);			

		});

		it('should accept 3 arguments: key, value, ttl', function() {

			var key = 'testKey',
				value = {'object' : 'value'},
				ttl = 5,
				result = storage.set(key, value, ttl);

			assert.isTrue(result);

		});

	});

	describe('NodeStorage.get', function() {

		it('should return null if an invalid key is provided', function() {

			var result = storage.get({}, 'test');

			assert.isFalse(result);

		});

		it('should accept argument: key', function() {

			var key = 'testKey',
				value = {'object' : 'value'};
				
			storage.set(key, value);
			var result = storage.get(key);

			assert.equal(value, result);	

		});

	});

	describe('NodeStorage.remove', function() {

		it('should remove the specified key', function() {

			var key = 'testKey',
				value = 'testValue';

			storage.set(key, value);

			storage.remove(key);

			var result = storage.get(key);

			assert.isFalse(result);

		})

	});

});