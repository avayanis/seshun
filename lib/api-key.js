var yaml = require("node-yaml-config");

var ApiKey = function() {

    configure: function(configuration) {

    },

    loadConfig: function(config_file) {
        var configuration = yaml.load(config_file);
        this.configure(configuration);
    },

    generateKey: function() {

    },
}

module.exports = new ApiKey();

exports.create = function() {
    return Object.create(ApiKey);
}

exports.generateKey = function(bucket) {

}

exports.deleteKey = function(bucket) {

}

exports.getKey = function(bucket) {

}

exports.validateMasterKey = function(master_key) {

}