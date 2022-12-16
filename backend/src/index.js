const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const { authRouter } = require('./routers/authRouter')
const { usersRouter } = require('./routers/usersRouter')

const { boardsRouter } = require('./routers/boardsRouter')
const { listsRouter } = require('./routers/listsRouter')
const { tasksRouter } = require('./routers/tasksRouter')
const { commentsRouter } = require('./routers/commentsRouter')

const { asyncWrapper } = require('./asyncWrapper')

const { authMiddleware } = require('./middlewares/authMiddleware')

const app = express()

dotenv.config()

mongoose.connect(process.env.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: false }))

app.use('/api/auth', authRouter)
app.use('/api/user', asyncWrapper(authMiddleware), usersRouter)

app.use('/api/boards', asyncWrapper(authMiddleware), boardsRouter)
app.use('/api/lists', asyncWrapper(authMiddleware), listsRouter)
app.use('/api/tasks', asyncWrapper(authMiddleware), tasksRouter)
app.use('/api/comments', asyncWrapper(authMiddleware), commentsRouter)

app.listen(process.env.PORT)

app.use(errorHandler)

function errorHandler(err, req, res, next) {
  return res.status(400).json({ message: err.message })
}
