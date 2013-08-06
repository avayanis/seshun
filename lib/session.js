var debug = require('debug')('seshun:session')

var Session = function(config, storage, apiKeyService) {	

	this._config = config || null,
	this._storage = storage || null,
	this._apiKeyService = apiKeyService || null;
}

Session.prototype = {

	get : function(bucket, key, sessionId) {

		if (!this.validate(bucket, key)) {
			return false;
		}

		return true;
	},

	validate : function(bucket, key) {

		if (this.apiKeyService.fetch(bucket) == key) {
			return true;
		}

		return false;
	},

	get config() {
		return this._config;
	},

	set config(value) {
		this._config = value;
	},

	get storage() {
		return this._storage;
	},

	set storage(value) {
		this._storage = value;
	},

	get apiKeyService() {
		return this._apiKeyService;
	},

	set apiKeyService(value) {
		this._apiKeyService = value;
	}

}

module.exports = Session;