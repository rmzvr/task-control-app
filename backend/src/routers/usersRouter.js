const express = require('express')

const router = express.Router()

const { getUser } = require('../controllers/usersController')

const { asyncWrapper } = require('../asyncWrapper')

router.get('/', asyncWrapper(getUser))

module.exports = {
  usersRouter: router
}
