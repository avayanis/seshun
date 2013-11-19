var yaml = require("node-yaml-config");

var ApiKey = {

	configuration: {},

    configure: function(configuration) {
    	this.configuration = configuration;
    },

    generateKey: function(master_key, bucket_name) {
    	if (!this.validateMasterKey(master_key)) {
    		return false;
    	}
    	// generate key for bucket_name
    },

    deleteKey: function(master_key, bucket_name) {
    	if (!this.validateMasterKey(master_key)) {
    		return false;
    	}
    	// delete key for bucket_name
    },

    getKey: function(master_key, bucket_name) {
    	if (!this.validateMasterKey(master_key)) {
    		return false;
    	}
    	// get key for bucket_name;
    },

    validateMasterKey: function(master_key) {
    	// if master_key is valid return true
    	return false;
    }
}

module.exports = new ApiKey();
