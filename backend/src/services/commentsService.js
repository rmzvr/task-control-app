const { Comment } = require('../models/Comment')

const getCommentsByTaskID = async (id) => {
  return await Comment.find({ taskID: id }, '-__v')
}

const getCommentsByBoardID = async (id) => {
  return await Comment.find({ boardID: id }, '-__v')
}

const addComment = async (data) => {
  const comment = new Comment(data)

  return await comment.save()
}

const updateComment = async ({ _id, name }) => {
  return await Comment.findByIdAndUpdate(_id, {
    name
  })
}

const deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id)
}

const deleteCommentsByBoardID = async (id) => {
  return await Comment.deleteMany({ boardID: id })
}

module.exports = {
  getCommentsByTaskID,
  getCommentsByBoardID,
  addComment,
  updateComment,
  deleteComment,
  deleteCommentsByBoardID
}
