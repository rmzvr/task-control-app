const express = require('express')

const router = express.Router()

const {
  getLists,
  getList,
  addList,
  updateList,
  deleteList
} = require('../controllers/listsController')

const { asyncWrapper } = require('../asyncWrapper')

router.get('/', asyncWrapper(getLists))

router.get('/:id', asyncWrapper(getList))

router.post('/', asyncWrapper(addList))

router.put('/:id', asyncWrapper(updateList))

router.delete('/:id', asyncWrapper(deleteList))

module.exports = {
  listsRouter: router
}
