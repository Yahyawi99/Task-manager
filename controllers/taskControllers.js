const { Error } = require("mongoose");
const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");
const { asyncWrapper } = require("../middlewares");

// Get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});

  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
});

// Get single task
const getSingleTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id });

  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No task  with id : ${id}` });
  }

  res.status(StatusCodes.OK).json({ task });

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
});

// Create task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ task });
});

// Update task
const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { runValidators: true, new: true }
  );

  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No task  with id : ${id}` });
  }

  res.status(StatusCodes.OK).json({ task });
});

// Delete task
const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No task  with id : ${id}` });
  }

  res.status(StatusCodes.OK).json({ msg: `Task deleted successfully.` });
});

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
