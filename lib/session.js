var uuid = require("node-uuid"),
	debug = require('debug')('seshun:session')

var Session = function(config, storage, apiKeyService) {	

	this._uuid = uuid;
	this._config = config || null,
	this._storage = storage || null,
	this._apiKeyService = apiKeyService || null;
}

Session.prototype = {

	create : function(bucket, key) {

		if (!this.validate(bucket, key)) {
			return false;
		}

		var sessionId = this._uuid.v1();

		return (this.storage.set(bucket, sessionId, {})) ? sessionId : false;
	},

	read : function(bucket, key, sessionId) {

		if (!this.validate(bucket, key)) {
			return false;
		}

		return this.storage.get(bucket, sessionId);
	},

	update : function(bucket, key, sessionId, data) {

		if (!this.validate(bucket, key)) {
			return false;
		}

		return (this.storage.set(bucket, sessionId, data)) ? true : false;
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

	get storage() {
		return this._storage;
	},

	get apiKeyService() {
		return this._apiKeyService;
	}
}

module.exports = Session;