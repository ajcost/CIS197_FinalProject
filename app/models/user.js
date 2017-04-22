var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var user = mongoose.Schema({
  username : String,
  password : String
});

user.hashify = function (password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

user.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', user);