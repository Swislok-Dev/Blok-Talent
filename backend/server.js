const express = require('express')
require('dotenv').config()
require('colors')
const port = process.env.PORT
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/tasks', require('./routes/taskRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`.magenta))
