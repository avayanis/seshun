var uuid = require("node-uuid"),
	debug = require('debug')('seshun:apikeys');

var ApiKeys = function(config, storage) {

	this._uuid = uuid;
	this._config = config;
	this._storage = storage,
	this._apiKeyBucket = config.storage.api_key_bucket || '_api_keys';

	var apiKeys = this.storage.get(this._apiKeyBucket);

	if (!apiKeys) {
		this.storage.set(this._apiKeyBucket, {});
	}
}

ApiKeys.prototype = {

	create:function(bucketName) {

		var apiKeys = this.storage.get(this._apiKeyBucket);

		if (typeof apiKeys[bucketName] !== 'undefined') {
			debug('Bucket: ' + bucketName + ' already exists');
			return false;
		}

		var apiKey = this._uuid.v1();

		apiKeys[bucketName] = apiKey;
		return (this._storage.set(this._apiKeyBucket, apiKeys)) ? apiKey : false;
	},

	fetch: function(bucketName) {

		var apiKeys = this.storage.get(this._apiKeyBucket);

		if (typeof apiKeys[bucketName] === 'undefined') {
			return false;
		}

		return apiKeys[bucketName];
	},

	delete: function(bucketName) {

		var apiKeys = this.storage.get(this._apiKeyBucket);

		if (typeof apiKeys[bucketName] === 'undefined') {
			return false;
		}

		delete apiKeys[bucketName];
		return (this._storage.set(this._apiKeyBucket, apiKeys)) ? true : false;
	},

	get uuid() {
		return this._uuid;
	},

	set uuid(value) {
		this._uuid = value;
	},

	get storage() {
		return this._storage;
	},

	set storage(value) {
		this._storage = value;
	}
}

module.exports = ApiKeys;
