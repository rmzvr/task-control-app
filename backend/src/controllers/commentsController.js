const commentsService = require('../services/commentsService')

const getCommentsByTaskID = async (req, res) => {
  const taskID = req.query.taskID

  const comments = await commentsService.getCommentsByTaskID(taskID)

  return res.status(200).json(comments)
}

const getCommentsByBoardID = async (req, res) => {
  const boardID = req.query.boardID

  const comments = await commentsService.getCommentsByBoardID(boardID)

  return res.status(200).json(comments)
}

const addComment = async (req, res) => {
  const comment = req.body

  await commentsService.addComment(comment)

  return res.status(200).json({
    message: 'Comment added successfully'
  })
}

const updateComment = async (req, res) => {
  const comment = req.body

  await commentsService.updateComment(comment)

  return res.status(200).json({
    message: 'Comment updated successfully'
  })
}

const deleteComment = async (req, res) => {
  const commentID = req.params.id

  await commentsService.deleteComment(commentID)

  return res.status(200).json({
    message: 'Comment deleted successfully'
  })
}

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  getCommentsByTaskID,
  getCommentsByBoardID
}
