const boardsService = require('../services/boardsService')
const tasksService = require('../services/tasksService')
const listsService = require('../services/listsService')
const commentsService = require('../services/commentsService')

const getBoards = async (req, res) => {
  const userID = req.query.userID

  const boards = await boardsService.getBoardsByUserID(userID)

  return res.status(200).json(boards)
}

const getBoard = async (req, res) => {
  const boardID = req.params.id

  const board = await boardsService.getBoard(boardID)

  if (!board) {
    throw Error('Board not found')
  }

  return res.status(200).json(board)
}

const addBoard = async (req, res) => {
  console.log(req.body)
  await boardsService.addBoard(req.body)

  return res.status(200).json({
    message: 'Board created successfully'
  })
}

const updateBoard = async (req, res) => {
  await boardsService.updateBoard(req.params.id, req.body)

  return res.status(200).json({
    message: 'Board updated successfully'
  })
}

const deleteBoard = async (req, res) => {
  const boardID = req.params.id

  await boardsService.deleteBoard(boardID)

  await listsService.deleteListsByBoardID(boardID)
  await tasksService.deleteTasksByBoardID(boardID)
  await commentsService.deleteCommentsByBoardID(boardID)

  return res.status(200).json({
    message: 'Board deleted successfully'
  })
}

module.exports = {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard
}
