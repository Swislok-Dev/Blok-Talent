const express = require('express')
const router = express.Router()

// GET all tasks
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Get all tasks' })
})

// POST a new task
router.post('/', (req, res) => {
  res.status(200).json({ message: 'Create a new task'})
})

// UPDATE a task with :id
router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Update task number ${req.params.id}`})
})

// DELETE a task with :id
router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Deleted task ${req.params.id}`})
})

module.exports = router
