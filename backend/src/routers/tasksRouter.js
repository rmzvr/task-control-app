const express = require('express')

const router = express.Router()

const {
  getAllTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
  addTaskComment,
  deleteTaskComment,
  getTasksByBoardID
} = require('../controllers/tasksController')

const { asyncWrapper } = require('../asyncWrapper')

router.get('/', asyncWrapper(getAllTasks))

router.get('/board', asyncWrapper(getTasksByBoardID))

router.get('/:id', asyncWrapper(getTask))

router.post('/', asyncWrapper(addTask))

router.put('/:id', asyncWrapper(updateTask))

router.put('/:id/comment', asyncWrapper(addTaskComment))

router.delete(
  '/:id/comment/:commentId',
  asyncWrapper(deleteTaskComment)
)

router.delete('/:id', asyncWrapper(deleteTask))

module.exports = {
  tasksRouter: router
}
