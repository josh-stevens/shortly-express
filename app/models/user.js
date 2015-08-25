var db = require('../config');
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
var Link = require('./link.js');

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: false,
  links: function() {
    return this.hasMany(Link);
  },
  initialize: function(){
    this.on('creating', function(model, attrs, options) {
      var salt = bcrypt.genSaltSync();
      var pass = bcrypt.hashSync(model.get('password'), salt);
      model.set('password', pass);
    });
  }
});

module.exports = User;
