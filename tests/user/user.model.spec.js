'use strict';

var chai = require('chai');
var should = chai.should();

// system under test
var User = require('./../../server/api/user/user.model');

describe('User model validation', function(){

  it('user should have an email', function(done){
      var user = new User({email: 'max@kimambo.de'});
      user.email.should.equal('max@kimambo.de');
    done();   
  });

});
