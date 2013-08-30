require('./../test');

var ApiKeys = require(libpath + '/api-keys'),
	ApiKeyService, uuidMock;

describe('ApiKeys Service', function() {

	beforeEach(function() {
		
		var config = {
				"storage" : {
					"api_key_bucket" : "_api_keys"
				}
			},
			storage = mocks.getStorage();

		ApiKeyService = new ApiKeys(config, storage);
	
	});

	describe('ApiKeys.create', function() {

		it('should return an API key when passed a valid bucketName', function() {

			var bucket = 'test',
				testKey = '12ab',
				storage = ApiKeyService.storage;
				
			sinon.stub(ApiKeyService.uuid, "v1").returns(testKey),
			sinon.stub(storage, 'get').withArgs(ApiKeyService._apiKeyBucket, bucket).returns(false);
			sinon.stub(storage, 'set').withArgs(ApiKeyService._apiKeyBucket, bucket, testKey).returns(true);

			var result = ApiKeyService.create(bucket);

			assert.equal(testKey, result);

			ApiKeyService.uuid.v1.restore();
		});

		it('should return false if ApiKey already exists', function() {
			
			var bucket = 'test',
				testKey = '12ab',
				storage = ApiKeyService.storage;
			
			sinon.stub(ApiKeyService.uuid, "v1").returns(testKey),
			sinon.stub(storage, 'get').withArgs(ApiKeyService._apiKeyBucket, bucket).returns(testKey);

			var result = ApiKeyService.create(bucket);
			
			assert.isFalse(result);

		});

	});

	describe('ApiKeys.fetch', function() {

		it('should return an ApiKey if the requested ApiKey exists', function() {

			var bucket = 'test',
				testKey = '12ab',
				storage = ApiKeyService.storage;

			sinon.stub(storage, 'get').withArgs(ApiKeyService._apiKeyBucket, bucket).returns(testKey);
				
			var result = ApiKeyService.fetch(bucket);

			assert.equal(testKey, result);

		});

		it('should return false if the requested ApiKey does not exist', function() {

			var bucket = 'test',
				storage = ApiKeyService.storage;
				
			sinon.stub(storage, 'get').withArgs(ApiKeyService._apiKeyBucket).returns(false);
			
			var result = ApiKeyService.fetch(bucket);

			assert.isFalse(result);

		});

	});

	describe('ApiKeys.delete', function() {

		it('should return true when an apiKey is successfully deleted', function() {

			var bucket = 'test',
				storage = ApiKeyService.storage;

			sinon.stub(storage, 'remove').withArgs(ApiKeyService._apiKeyBucket, bucket).returns(true);
			
			var deleteResult = ApiKeyService.delete(bucket);

			assert.isTrue(deleteResult);

		});

		it('should return false when a non-existant apiKey is deleted', function() {

			var bucket = 'test',
				storage = ApiKeyService.storage;
				
			sinon.stub(storage, 'remove').withArgs(ApiKeyService._apiKeyBucket, bucket).returns(false);

			var deleteResult = ApiKeyService.delete(bucket);

			assert.isFalse(deleteResult);

		});

	});

});