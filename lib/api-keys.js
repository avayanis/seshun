var uuid = require("node-uuid"),
	debug = require('debug')('seshun:apikeys');

var ApiKeys = {
	_uuid: uuid,

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

		if (typeof this._storage.get(bucketName) === 'undefined') {
			return false;
		}

		return this._storage.get(bucketName);

	},

	delete: function(bucketName) {

		if (typeof this._storage.get(bucketName) === 'undefined') {
			return false;
		}

		return this._storage.remove(bucketName);

	},

	getStorage: function() {

		return this._storage;

	}
};

module.exports = Object.create(ApiKeys);