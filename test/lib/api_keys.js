require('./../test');

var ApiKeys = require(libpath + '/api-keys'),
	ApiKeyService, uuidMock;

describe('ApiKeys Service', function() {

	beforeEach(function() {
		
		var storage = {
			"get" : function(){},
			"set" : function(){},
			"remove" : function(){}
		};

		ApiKeyService = new ApiKeys(storage);
	
	});

	describe('ApiKeys.create', function() {

		it('should return an API key when passed a valid bucketName', function() {

			var bucket = 'test',
				testKey = '12ab',
				storage = ApiKeyService.getStorage(),
				uuidMock = sinon.stub(ApiKeyService._uuid, "v1").returns(testKey);


			sinon.stub(storage, 'get').withArgs(bucket).returns(false);
			sinon.stub(storage, 'set').withArgs(bucket, 0);

			var result = ApiKeyService.create(bucket);

			assert.equal(testKey, result);

			ApiKeyService._uuid.v1.restore();

		});

		it('should return false if ApiKey already exists', function() {
			
			var bucket = 'test',
				storage = ApiKeyService.getStorage();
			
			sinon.stub(storage, 'get').withArgs(bucket).returns(false);

			ApiKeyService.create(bucket);

			storage.get.withArgs(bucket).returns(true);

			var result = ApiKeyService.create(bucket);
			
			assert.isFalse(result);

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