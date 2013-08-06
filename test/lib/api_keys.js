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
			storage = {
				"get" : function(){},
				"set" : function(){},
				"remove" : function(){}
			};

		ApiKeyService = new ApiKeys(config, storage);
	
	});

	describe('ApiKeys.create', function() {

		it('should return an API key when passed a valid bucketName', function() {

			var bucket = 'test',
				testKey = '12ab',
				storage = ApiKeyService.storage,
				uuidMock = sinon.stub(ApiKeyService.uuid, "v1").returns(testKey);

			sinon.stub(storage, 'get').withArgs(ApiKeyService._apiKeyBucket).returns({});

			var setReturnValue = {};
			setReturnValue[bucket] = testKey;

			sinon.stub(storage, 'set').withArgs(ApiKeyService._apiKeyBucket, setReturnValue).returns(uuidMock);

			var result = ApiKeyService.create(bucket);

			assert.equal(testKey, result);

			ApiKeyService._uuid.v1.restore();

		});

		it('should return false if ApiKey already exists', function() {
			
			var bucket = 'test',
				storage = ApiKeyService.storage;
			
			sinon.stub(storage, 'get').withArgs(ApiKeyService._apiKeyBucket).returns({});

			ApiKeyService.create(bucket);

			storage.get.restore();

			var setReturnValue = {};
			setReturnValue[bucket] = '123';
			sinon.stub(storage, 'get').withArgs(ApiKeyService._apiKeyBucket).returns(setReturnValue);

			var result = ApiKeyService.create(bucket);
			
			assert.isFalse(result);

		});

	});

	describe('ApiKeys.fetch', function() {

		it('should return the same ApiKey that was returned when created', function() {

			var bucket = 'test',
				storage = ApiKeyService.storage;

			sinon.stub(storage, 'get').withArgs(bucket).returns(false);

			var apiKey = ApiKeyService.create(bucket);

			storage.get.restore();
			sinon.stub(storage, 'get').withArgs(bucket).returns(apiKey);
				
			var result = ApiKeyService.fetch(bucket);

			assert.equal(apiKey, result);

		});

		it('should return false if the requested ApiKey does not exist', function() {

			var bucket = 'test',
				storage = ApiKeyService.storage;
				
			sinon.stub(storage, 'get').withArgs(bucket).returns(false);
			
			var result = ApiKeyService.fetch(bucket);

			assert.isFalse(result);

		});

	});

	describe('ApiKeys.delete', function() {

		it('should return true when an apiKey is successfully deleted', function() {

			var bucket = 'test',
				testKey = '12ab',
				storage = ApiKeyService.storage;
				
			sinon.stub(storage, 'get').withArgs(bucket).returns(false);
			sinon.stub(storage, 'set').withArgs(bucket, 0);
			sinon.stub(storage, 'remove').returns(true);

			var apiKey = ApiKeyService.create(bucket);

			assert.ok(apiKey);

			storage.get.restore();
			sinon.stub(storage, 'get').withArgs(bucket).returns(true);

			var deleteResult = ApiKeyService.delete(bucket);

			assert.isTrue(deleteResult);

		});

		it('should return false when a non-existant apiKey is deleted', function() {

			var bucket = 'test',
				testKey = '12ab',
				storage = ApiKeyService.storage;
				
			sinon.stub(storage, 'get').withArgs(bucket).returns(false);

			var deleteResult = ApiKeyService.delete(bucket);

			assert.isFalse(deleteResult);

		});

	});

});