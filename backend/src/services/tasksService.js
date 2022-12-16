const { Task } = require('../models/Task')

const getAllTasks = async (id) => {
  return await Task.find({ id }, '-__v')
}

const getTasksByBoardID = async (id) => {
  return await Task.find({ boardID: id }, '-__v')
}

const getTask = async (taskID) => {
  return await Task.findById(taskID, '-__v')
}

const addTask = async (data) => {
  const task = new Task(data)

  return await task.save()
}

const updateTask = async (
  taskID,
  { name, description, boardID, listID, isArchived }
) => {
  return await Task.findByIdAndUpdate(taskID, {
    name,
    description,
    boardID,
    listID,
    isArchived
  })
}

const deleteTasksByBoardID = async (id) => {
  return await Task.deleteMany({ boardID: id })
}

const deleteTask = async (taskID) => {
  return await Task.findByIdAndDelete(taskID)
}

module.exports = {
  getAllTasks,
  addTask,
  getTask,
  updateTask,
  deleteTask,
  deleteTasksByBoardID,
  getTasksByBoardID
}
