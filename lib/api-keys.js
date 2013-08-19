var uuid = require("node-uuid"),
	debug = require('debug')('seshun:apikeys');

var ApiKeys = function(config, storage) {

	this._uuid = uuid;
	this._config = config;
	this._storage = storage,
	this._apiKeyBucket = config.storage.api_key_bucket || '_api_keys';
}

ApiKeys.prototype = {

	create:function(bucketName) {

		var currentKey = this.storage.get(this._apiKeyBucket, bucketName);

		if (typeof currentKey === 'string') {
			debug('Bucket: ' + bucketName + ' already exists');
			return false;
		}

		var apiKey = this._uuid.v1();

		return (this.storage.set(this._apiKeyBucket, bucketName, apiKey)) ? apiKey : false;
	},

	fetch: function(bucketName) {

		return this.storage.get(this._apiKeyBucket, bucketName);
	},

	delete: function(bucketName) {

		return this.storage.remove(this._apiKeyBucket, bucketName);
	},

	get uuid() {
		return this._uuid;
	},

	get storage() {
		return this._storage;
	},

	get apiKeyBucket() {
		return this._apiKeyBucket;
	}
}

module.exports = ApiKeys;