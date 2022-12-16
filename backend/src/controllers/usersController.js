const getUser = async (req, res, next) => {
  return res.status(200).json(req.user)
}

module.exports = {
  getUser
}
