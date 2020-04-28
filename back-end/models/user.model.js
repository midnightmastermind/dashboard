let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  firstName: String,
  lastName: String
})

userSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName
})

userSchema.virtual('fullName').set(function(name) {
  let str = name.split(' ')

  this.firstName = str[0]
  this.lastName = str[1]
})

userSchema.methods.getInitials = function() {
  return this.firstName[0] + this.lastName[0]
}

const User = mongoose.model('User', UserSchema);
module.exports = User
