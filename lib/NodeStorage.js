// Warning!
// This storage engine uses node.js runtime memory. It is meant
// as a convenient way to develop and test against the service
// without having to setup redis or riak, but YOU SHOULD NOT USE
// THIS IN PRODUCTION. Memory use is unpredictable and there is
// no persistence layer, so a server restart means all your data
// will be lost.
NodeStorage = function() {

    var keys = {};

    return {

        set: function(key, value) {

            if (typeof key !== 'string') return false;

            keys[key] = value;
        
        },

        get: function(key) {
            return keys[key];
        },

        delete: function(key) {
            delete keys[key];
        }        
    }
};

module.exports = new NodeStorage();
