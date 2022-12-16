const listsService = require('../services/listsService')

const getLists = async (req, res) => {
  const boardID = req.query.boardID

  const lists = await listsService.getListsByBoardID(boardID)

  return res.status(200).json(lists)
}

const getList = async (req, res) => {
  const listID = req.params.id

  const list = await listsService.getList(listID)

  if (!list) {
    throw Error('List not found')
  }

  return res.status(200).json(list)
}

const addList = async (req, res) => {
  const listName = req.body.name
  const boardID = req.query.boardID

  await listsService.addList({ name: listName, boardID })

  return res.status(200).json({
    message: 'List created successfully'
  })
}

const updateList = async (req, res) => {
  const listID = req.params.id
  const listBackground = req.body.background

  await listsService.updateList(listID, listBackground)

  return res.status(200).json({
    message: 'List name changed successfully'
  })
}

const deleteList = async (req, res) => {
  const listID = req.params.id

  const list = await listsService.deleteList(listID)

  if (!list) {
    throw Error('List not found')
  }

  return res.status(200).json({
    message: 'List deleted successfully'
  })
}

module.exports = {
  getLists,
  getList,
  addList,
  updateList,
  deleteList
}
