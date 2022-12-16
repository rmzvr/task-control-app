const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usersService = require('../services/usersService')

const registerUser = async (req, res, next) => {
  const { username, password } = req.body

  await usersService.saveUser({ username, password })

  return res
    .status(200)
    .json({ message: 'Profile created successfully' })
}

const loginUser = async (req, res, next) => {
  const { username, password } = req.body

  const user = await usersService.getUserByUsername(username)

  if (!user) {
    throw Error(`User doesn't exist`)
  }

  const isPasswordCorrect = await bcrypt.compare(
    String(password),
    String(user.password)
  )

  if (!isPasswordCorrect) {
    throw Error('Invalid password')
  }

  const payload = {
    userID: user._id,
    username: user.username,
    created_date: user.created_date
  }
  const jwt_token = jwt.sign(payload, process.env.SECRET_JWT_KEY)

  return res.status(200).json({
    jwt_token
  })
}

module.exports = {
  registerUser,
  loginUser
}
