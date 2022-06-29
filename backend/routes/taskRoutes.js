const express = require('express')
const router = express.Router()
const {
  getTasks,
  getTask,
  setTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController')

// GET all tasks
router.route('/').get(getTasks)

// GET a single task
router.route('/:id').get(getTask)

// POST a new task
router.route('/').post(setTask)

// UPDATE a task with :id
router.route('/:id').put(updateTask)

// DELETE a task with :id
router.route('/:id').delete(deleteTask)

module.exports = router
