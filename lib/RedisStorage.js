var data = require("DataInterface"),
	redis = require("redis");

var RedisInterface = {

	configure: function(configuration) {
		this.configuration = configuration;
	}

	set: function(key, value) {
		redis.put(key, value);
	},

	get: function(key) {
		redis.get(key)
	},

	delete: function(key) {
		redis.delete(key)
	}

}

RedisInterface.prototype = data;