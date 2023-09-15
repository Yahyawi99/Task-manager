const { Error } = require("mongoose");
const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

// Get single task
const getSingleTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id });

    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No task  with id : ${id}` });
    }

    res.status(StatusCodes.OK).json({ task });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

// Create task
const createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body });

    res.status(StatusCodes.CREATED).json({ task });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

// Update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;

  try {
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
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

// Delete task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id });

    if (!task) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No task  with id : ${id}` });
    }

    res.status(StatusCodes.OK).json({ msg: `Task deleted successfully.` });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
