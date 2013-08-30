require('./../test');

var Session = require(libpath + '/session'),
	ApiKeys = require(libpath + '/api-keys'),
	SessionService, ApiKeyservice;

describe('Session Service', function() {

	beforeEach(function() {

		var config = {

		},
		storage = mocks.getStorage();

		SessionService = new Session(config, storage, ApiKeyservice);
	});
});