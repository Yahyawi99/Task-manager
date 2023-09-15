const getAllTasks = async (req, res) => {
  res.send("get All");
};

const getSingleTask = async (req, res) => {
  res.send("get one");
};

const createTask = async (req, res) => {
  res.send("create");
};

const updateTask = async (req, res) => {
  res.send("update");
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
