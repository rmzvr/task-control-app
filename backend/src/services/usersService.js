const { User } = require('../models/User')
const bcrypt = require('bcryptjs')

const getUserByUsername = async (username) => {
  return await User.findOne({ username })
}

const getUserByID = async (id) => {
  return await User.findById(id)
}

const saveUser = async ({ username, password }) => {
  const user = new User({
    username,
    password: await bcrypt.hash(password, 10)
  })

  return await user.save()
}

module.exports = {
  saveUser,
  getUserByUsername,
  getUserByID
}
