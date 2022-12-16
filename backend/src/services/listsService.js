const { default: mongoose } = require('mongoose')
const { List } = require('../models/List')

const getLists = async () => {
  return await List.find({}, '-__v')
}

const getListsByBoardID = async (boardID) => {
  return await List.aggregate([
    {
      $match: {
        boardID: new mongoose.mongo.ObjectId(boardID)
      }
    },
    {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'listID',
        as: 'tasks'
      }
    }
  ])
}

const getList = async (listID) => {
  return await List.findById(listID, '-__v')
}

const addList = async (data) => {
  const list = new List(data)

  return await list.save()
}

const updateList = async (listID, background) => {
  return await List.findByIdAndUpdate(listID, { background })
}

const deleteList = async (listID) => {
  return await List.findByIdAndDelete(listID)
}

const deleteListsByBoardID = async (boardID) => {
  return await List.deleteMany({ boardID: boardID })
}

module.exports = {
  getLists,
  getListsByBoardID,
  getList,
  addList,
  updateList,
  deleteList,
  deleteListsByBoardID
}
