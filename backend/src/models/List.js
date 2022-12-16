const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  boardID: {
    type: mongoose.Schema.Types.ObjectId
  },
  background: {
    type: String
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId
  },
  isArchive: {
    type: Boolean,
    default: false
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

const List = mongoose.model('lists', listSchema)

module.exports = {
  List
}
