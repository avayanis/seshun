// Warning!
// This storage engine uses node.js runtime memory. It is meant
// as a convenient way to develop and test against the service
// without having to setup redis or riak, but YOU SHOULD NOT USE
// THIS IN PRODUCTION. Memory use is unpredictable and there is
// no persistence layer, so a server restart means all your data
// will be lost.

var debug = require('debug')('seshun:storage:node');

var NodeStorage = function() {
    this._data = {};
}

NodeStorage.prototype = {

    set: function (bucket, key, value, ttl) {

        if (typeof bucket !== 'string') return false;
        if (typeof key !== 'string') return false;

        if (typeof this._data[bucket] === 'undefined') {
            this._data[bucket] = {};
        }

        this._data[bucket][key] = {
            'value': value,
            'ttl': ttl || 0
        };

        debug('Set data for ' + bucket + ':' + key);
        return true;
    },

    get: function (bucket, key) {

        try {
            return this._data[bucket][key].value;
        } catch (error) {
            return false;
        }
    },

    remove: function (bucket, key) {

        if (typeof this._data[bucket] === 'undefined' || 
            typeof this._data[bucket][key] === 'undefined') return false;

        delete this._data[bucket][key];
        return true;
    }
};

module.exports = NodeStorage;