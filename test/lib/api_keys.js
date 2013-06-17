require('./../test');

var ApiKeys = require(libpath + '/api-keys'),
	ApiKeyService, uuidMock;

describe('ApiKeys Service', function() {

	beforeEach(function() {
		
		ApiKeyService = new ApiKeys();
	
	});

	describe('ApiKeys.create', function() {

		it('should return an API key when passed a valid bucketName', function() {

			var testKey = '12ab',
				uuidMock = sinon.stub(ApiKeyService._uuid, "v1").returns(testKey);

			var result = ApiKeyService.create("test");

			assert.equal(testKey, result);

			ApiKeyService._uuid.v1.restore();

		});

		it('should return false if ApiKey already exists', function() {
			
			var testKey = '12ab',
				uuidMock = sinon.stub(ApiKeyService._uuid, "v1").returns(testKey);

			ApiKeyService.create("test");

			var result = ApiKeyService.create("test");
			
			assert.isFalse(result);

			ApiKeyService._uuid.v1.restore();

		});

	});

});