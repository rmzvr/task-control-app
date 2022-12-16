const express = require('express')

const router = express.Router()

const {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard
} = require('../controllers/boardsController')

const { asyncWrapper } = require('../asyncWrapper')

router.get('/', asyncWrapper(getBoards))

router.get('/:id', asyncWrapper(getBoard))

router.post('/', asyncWrapper(addBoard))

router.put('/:id', asyncWrapper(updateBoard))

router.delete('/:id', asyncWrapper(deleteBoard))

module.exports = {
  boardsRouter: router
}
