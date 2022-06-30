const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// Method used to validate incoming _id
const validId = (id) => {
  return mongoose.Types.ObjectId.isValid(id)
}

// GET /api/tasks
const getTasks = asyncHandler(async (req, res) => {
  const allTasks = await Task.find()
  if (!allTasks) {
    res.status(404)
    throw new Error('No tasks found')
  } else {
    console.log('taskController found all the tasks')
  }
  res.status(200).json(allTasks)
})

// POST /api/tasks
const setTask = asyncHandler(async (req, res) => {
  const { taskName } = req.body

  if (!taskName) {
    res.status(400)
    throw new Error('Please give this task a name')
  }

  const newTask = await Task.create({
    taskName: req.body.taskName,
  })

  res.status(200).json(newTask)
})

// GET /api/tasks/:id
const getTask = asyncHandler(async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      return res
        .status(400)
        .json({ message: `Task not found for ID: ${req.params.id}` })
    } else {
      const task = await Task.findById({ _id: req.params.id })
      console.log(`taskController found _id: ${req.params.id}`)
      res.status(200).json(task)
    }
  } catch (err) {
    console.log(err)
  }
})

// PUT /api/tasks/:id
const updateTask = asyncHandler(async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      res.status(400).json({ message: `Cannot update task #${req.params.id}` })
    } else {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )
      res.status(200).json(updatedTask)
    }
  } catch (err) {
    console.error(err)
  }
})

// DELETE /api/tasks/:id
const deleteTask = asyncHandler(async (req, res) => {
  try {
    if (!validId(req.params.id)) {
      res
        .status(400)
        .json({ message: `Cannot find or delete task ${req.params.id}` })
    } else {
      const task = await Task.findById({ _id: req.params.id })
      if (task) {
        await task.remove()
        res.status(200).json({
          message: `Task number ${req.params.id} has been deleted`,
          _id: req.params.id,
        })
      } else {
        res
          .status(404)
          .json({ message: `We cannot find task #${req.params.id}` })
      }
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = {
  getTasks,
  getTask,
  setTask,
  updateTask,
  deleteTask,
}
