const { Error } = require("mongoose");
const Task = require("../models/Task");
const { StatusCodes } = require("http-status-codes");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({});

  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};

const getSingleTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOne({ _id: id });

  if (!task) {
    throw new Error(`No task with id : ${id}`);
  }

  res.status(StatusCodes.OK).json({ task });
};

const createTask = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.send("error");
  }

  const task = await Task.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({ task });
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;

  const task = await Task.findOne({ _id: id });

  if (!task) {
    throw new Error(`No task with id : ${id}`);
  }

  task.name = name;
  task.completed = completed;

  res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
  res.send("delete");
};

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask,
};
