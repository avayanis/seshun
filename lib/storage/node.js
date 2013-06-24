// Warning!
// This storage engine uses node.js runtime memory. It is meant
// as a convenient way to develop and test against the service
// without having to setup redis or riak, but YOU SHOULD NOT USE
// THIS IN PRODUCTION. Memory use is unpredictable and there is
// no persistence layer, so a server restart means all your data
// will be lost.

var NodeStorage = {
    _keys: {},
    set: function (key, value, ttl) {

        if (typeof key !== 'string') return false;

        this._keys[key] = {
            'value': value,
            'ttl': ttl || 0
        };

        return true;

    },
    get: function (key) {

        try {
            return this._keys[key].value;
        } catch (error) {
            return false;
        }

    },
    remove: function (key) {

        delete this._keys[key];

    }
};

module.exports = Object.create(NodeStorage);