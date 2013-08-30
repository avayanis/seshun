chai = require('chai');
sinon = require('sinon');
should = chai.should();
expect = chai.expect;
assert = chai.assert;

if (process.env.HTML_COVERAGE) {
    libpath = __dirname + "/../lib-cov"
} else {
    libpath = __dirname + "/../lib"
}

mocks = {
	getStorage : function() {
		return {
			"get" : function(){},
			"set" : function(){},
			"remove" : function(){}
		}
	}
}