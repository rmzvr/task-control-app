const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser
} = require('../controllers/authController.js')

const { asyncWrapper } = require('../asyncWrapper')

router.post('/register', asyncWrapper(registerUser))

router.post('/login', asyncWrapper(loginUser))

module.exports = {
  authRouter: router
}
