const { default: mongoose } = require('mongoose')

const tasksService = require('../services/tasksService')

const getAllTasks = async (req, res) => {
  const boardID = req.query.boardID

  const tasks = await tasksService.getAllTasks(boardID)

  return res.status(200).json(tasks)
}

const getTasksByBoardID = async (req, res) => {
  const boardID = req.query.boardID

  const tasks = await tasksService.getTasksByBoardID(boardID)

  return res.status(200).json(tasks)
}

const getTask = async (req, res) => {
  const taskID = req.params.id

  const task = await tasksService.getTask(taskID)

  if (!task) {
    throw Error('Task not found')
  }

  return res.status(200).json(task)
}

const addTask = async (req, res) => {
  const listID = req.query.listID

  await tasksService.addTask({
    ...req.body,
    listID: new mongoose.mongo.ObjectId(listID)
  })

  return res.status(200).json({
    message: 'Task created successfully'
  })
}

const updateTask = async (req, res) => {
  const taskID = req.params.id
  const task = req.body

  await tasksService.updateTask(taskID, task)

  return res.status(200).json({
    message: 'Task updated successfully'
  })
}

const addTaskComment = async (req, res) => {
  const taskID = req.params.id
  const comment = req.body.comment

  await tasksService.addTaskComment(taskID, comment)

  return res.status(200).json({
    message: 'Task comment added successfully'
  })
}

const deleteTaskComment = async (req, res) => {
  const taskID = req.params.id
  const commentID = req.params.commentID

  await tasksService.deleteTaskComment(taskID, commentID)

  return res.status(200).json({
    message: 'Task comment deleted successfully'
  })
}

const deleteTask = async (req, res) => {
  const taskID = req.params.id

  const task = await tasksService.deleteTask(taskID)

  if (!task) {
    throw Error('Task not found')
  }

  res.status(200).json({
    message: 'Task deleted successfully'
  })
}

module.exports = {
  getAllTasks,
  addTask,
  addTaskComment,
  deleteTaskComment,
  getTask,
  updateTask,
  deleteTask,
  getTasksByBoardID
}
