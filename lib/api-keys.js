var uuid = require("node-uuid"),
	debug = require('debug')('seshun:apikeys');

var ApiKeys = function(storage) {
	this._uuid = uuid;
	this._storage = storage || null;
}

ApiKeys.prototype = {

	create:function(bucketName) {

		if (this._storage.get(bucketName) !== false) {
			debug('Bucket: ' + bucketName + ' already exists');
			return false;
		}

		var apiKey = this._uuid.v1();

		this._storage.set(bucketName, apiKey);

		return apiKey;
	},

	fetch: function(bucketName) {

		if (!this._storage.get(bucketName)) {
			return false;
		}

		return this._storage.get(bucketName);
	},

	delete: function(bucketName) {

		if (!this._storage.get(bucketName)) {
			return false;
		}

		return this._storage.remove(bucketName);
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
