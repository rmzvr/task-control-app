const { default: mongoose } = require('mongoose')
const { Board } = require('../models/Board')
const { List } = require('../models/List')
const { addList } = require('./listsService')

const getBoardsByUserID = async (id) => {
  const boards = await Board.aggregate([
    {
      $match: {
        userID: new mongoose.mongo.ObjectId(id)
      }
    },
    {
      $lookup: {
        from: 'lists',
        localField: '_id',
        foreignField: 'boardID',
        as: 'lists'
      }
    }
  ])

  const boardlists = boards.map(async (board) => {
    const lists = await List.aggregate([
      {
        $match: {
          boardID: new mongoose.mongo.ObjectId(board._id)
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

    return {
      ...board,
      lists
    }
  })

  return Promise.all(boardlists)
}

const getBoard = async (boardID) => {
  return await Board.findById(boardID, '-__v')
}

const addBoard = async (data) => {
  const board = new Board(data)

  await addList({
    name: 'Todo',
    boardID: board._id,
    background: board.background
  })
  await addList({
    name: 'In progress',
    boardID: board._id,
    background: board.background
  })
  await addList({
    name: 'Done',
    boardID: board._id,
    background: board.background
  })
  await addList({
    name: 'Archive',
    boardID: board._id,
    background: board.background,
    isArchive: true
  })

  return await board.save()
}

const updateBoard = async (boardID, { name, background }) => {
  return await Board.findByIdAndUpdate(boardID, {
    name,
    background
  })
}

const deleteBoard = async (boardID) => {
  return await Board.findByIdAndDelete(boardID)
}

module.exports = {
  getBoardsByUserID,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard
}
