var uuid = require("node-uuid"),
	debug = require('debug')('seshun:apikeys');

ApiKeys = function() {
	this._buckets = {};
	this._uuid = uuid;
};

ApiKeys.prototype.create = function(bucketName) {

	if (typeof this._buckets[bucketName] !== 'undefined') {
		debug('Bucket: ' + bucketName + ' already exists');
		return false;
	}

	var apiKey = this._uuid.v1();

	this._buckets[bucketName] = apiKey;

	return apiKey;
}

ApiKeys.prototype.fetch = function(bucketName) {

	if (typeof this._buckets[bucketName] === 'undefined') {
		return false;
	}

	return this._buckets[bucketName];

}

ApiKeys.prototype.delete = function(bucketName) {

	if (typeof this._buckets[bucketName] === 'undefined') {
		return false;
	}

	delete this._buckets[bucketName];

	return true;

}

module.exports = ApiKeys;