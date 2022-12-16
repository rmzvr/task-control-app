const express = require('express')

const router = express.Router()

const {
  getCommentsByBoardID,
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/commentsController')

const { asyncWrapper } = require('../asyncWrapper')

router.get('/', asyncWrapper(getCommentsByBoardID))

router.post('/:id', asyncWrapper(addComment))

router.put('/:id', asyncWrapper(updateComment))

router.delete('/:id', asyncWrapper(deleteComment))

module.exports = {
  commentsRouter: router
}
