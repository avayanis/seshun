require('./../../test');

var NodeStorage = require(libpath + '/storage/node'),
	NodeStorageService;

describe('NodeStorage - In memory storage engine', function() {

	beforeEach(function() {
		NodeStorageService = new NodeStorage();
	});

	it('should be a valid storage interface', function() {
		assert.typeOf(NodeStorageService.set, 'function');
		assert.typeOf(NodeStorageService.get, 'function');
		assert.typeOf(NodeStorageService.remove, 'function');
	});

	describe('NodeStorage.set', function() {

		it('should return false if an invalid key is provided', function() {

			var result = NodeStorageService.set({}, 'test');

			assert.isFalse(result);

		});

		it('should accept 3 arguments: bucket, key, value', function() {

			var bucket = 'testBucket',
				key = 'testKey',
				value = {'object' : 'value'},
				result = NodeStorageService.set(bucket, key, value);

			assert.isTrue(result);			

		});

		it('should accept 4 arguments: key, value, ttl', function() {

			var bucket = 'testBucket',
				key = 'testKey',
				value = {'object' : 'value'},
				ttl = 5,
				result = NodeStorageService.set(bucket, key, value, ttl);

			assert.isTrue(result);

		});

	});

	describe('NodeStorage.get', function() {

		it('should return null if an invalid key is provided', function() {

			var result = NodeStorageService.get({}, 'test');

			assert.isFalse(result);

		});

		it('should accept arguments: bucket, key', function() {

			var bucket = 'testBucket',
				key = 'testKey',
				value = {'object' : 'value'};
				
			NodeStorageService.set(bucket, key, value);
			var result = NodeStorageService.get(bucket, key);

			assert.equal(value, result);	

		});

	});

	describe('NodeStorage.remove', function() {

		it('should remove the specified key and return True', function() {

			var bucket = 'testBucket',
				key = 'testKey',
				value = 'testValue';

			NodeStorageService.set(bucket, key, value);

			var deleteResult = NodeStorageService.remove(bucket, key),
				getResult = NodeStorageService.get(bucket, key);

			assert.isTrue(deleteResult);
			assert.isFalse(getResult);

		});

		it('should return False if key does not exist', function() {

			var bucket = 'testBucket',
				key = 'testKey';

			var deleteResult = NodeStorageService.remove(bucket, key);

			assert.isFalse(deleteResult);

		});

	});

});