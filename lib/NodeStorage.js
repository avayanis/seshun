// Generic interface to storing key value data
var NodeStorage = {

    keys = [],

    set: function(key, value) {
        this.keys[key] = value;
    },

    get: function(key) {
        return keys[key];
    },

    delete: function(key) {
        for (i in this.keys) {
            if(this.keys[i] === key) {
                this.keys = this.keys.splice(i, 1);
            }
        }
        this.keys = keys.splice(key, 1);
    }

}

module.exports = new NodeStorage();