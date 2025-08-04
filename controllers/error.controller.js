const { NODE_ENV } = require("../config/env.config");

const sendErrorDev = (error, req, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  });
};

const sendErrorProd = (error, req, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something is wrong! Please try again later.",
    });
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (NODE_ENV === "development") {
    sendErrorDev(error, req, res);
  } else if (NODE_ENV === "production") {
    sendErrorProd(error, req, res);
  }
};
