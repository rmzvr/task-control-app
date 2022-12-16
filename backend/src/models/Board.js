const mongoose = require('mongoose')

const boardSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  background: {
    type: String
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

const Board = mongoose.model('boards', boardSchema)

module.exports = {
  Board
}
