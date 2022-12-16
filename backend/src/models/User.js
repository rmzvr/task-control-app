const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('users', userSchema)

module.exports = {
  User
}
