require('./../test');

var ApiKeys = require(libpath + '/api-keys'),
	ApiKeyService, uuidMock;

describe('ApiKeys Service', function() {

	beforeEach(function() {
		
		ApiKeyService = new ApiKeys();
	
	});

	describe('ApiKeys.create', function() {

		it('should return an API key when passed a valid bucketName', function() {

			var bucket = 'test',
				testKey = '12ab',
				uuidMock = sinon.stub(ApiKeyService._uuid, "v1").returns(testKey);

			var result = ApiKeyService.create(bucket);

			assert.equal(testKey, result);

			ApiKeyService._uuid.v1.restore();

		});

		it('should return false if ApiKey already exists', function() {
			
			var bucket = 'test',
				testKey = '12ab',
				uuidMock = sinon.stub(ApiKeyService._uuid, "v1").returns(testKey);

			ApiKeyService.create(bucket);

			var result = ApiKeyService.create(bucket);
			
			assert.isFalse(result);

			ApiKeyService._uuid.v1.restore();

		});

	});

	describe('ApiKeys.fetch', function() {

		it('should return the same ApiKey that was returned when created', function() {

			var bucket = 'test',
				apiKey = ApiKeyService.create(bucket),
				result = ApiKeyService.fetch(bucket);

			assert.equal(apiKey, result);

		});

		it('should return false if the requested ApiKey does not exist', function() {

			var bucket = 'test',
				result = ApiKeyService.fetch(bucket);

			assert.isFalse(result);

		});

	});

	describe('ApiKeys.delete', function() {

		it('should return true when an apiKey is successfully deleted', function() {

			var bucket = 'test',
				apiKey = ApiKeyService.create(bucket);

			assert.ok(apiKey);

			var deleteResult = ApiKeyService.delete(bucket),
				getResult = ApiKeyService.fetch(bucket);

			assert.isTrue(deleteResult);
			assert.isFalse(getResult);

		});

	});

});