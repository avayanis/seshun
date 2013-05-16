require('./../test');

var storage = require(libpath + '/NodeStorage');

describe('NodeStorage - In memory storage engine', function() {

	describe('NodeStorage.set', function() {

		it('should have get/set/delete methods', function(){

			storage.should.have.property('set');
			storage.set.should.be.a('function');

			storage.should.have.property('get');
			storage.get.should.be.a('function');
			
			storage.should.have.property('delete');
			storage.delete.should.be.a('function');

		});

		it('should return false if an invalid key is provided', function() {

			var result = storage.set(function(){}, 'test');
			result.should.not.be.ok

		});

		it('should return true if it properly stores key/value', function() {



		});

	});

});