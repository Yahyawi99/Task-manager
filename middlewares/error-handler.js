const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
};

module.exports = errorHandler;
