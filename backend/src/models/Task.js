const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  boardID: {
    type: mongoose.Schema.Types.ObjectId
  },
  listID: {
    type: mongoose.Schema.Types.ObjectId
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

const Task = mongoose.model('tasks', taskSchema)

module.exports = {
  Task
}
