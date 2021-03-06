const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
  {
    taskName: {
      type: String,
      required: [true, 'Give this task a name'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Task', taskSchema)
