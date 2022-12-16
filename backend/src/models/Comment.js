const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  taskID: {
    type: mongoose.Schema.Types.ObjectId
  },
  boardID: {
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

const Comment = mongoose.model('comments', commentSchema)

module.exports = {
  Comment
}
