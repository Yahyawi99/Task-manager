const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide task name"],
    maxlength: [20, "name can not be more than 20 charachter"],
    trim: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },
});

TaskSchema.index({ name: 1 }, { unique: true });

module.exports = mongoose.model("Task", TaskSchema);
