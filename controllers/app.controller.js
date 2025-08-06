const asyncHandler = require("express-async-handler");
const { App } = require("../models");
const CustomError = require("../utils/customError");

const createNewAppHandler = asyncHandler(async (req, res) => {
  const { app_name, app_code } = req.body;

  if (!app_name || !app_code) {
    throw new CustomError("Please provide App name and code!", 400);
  }

  const newApp = await App.create({
    app_name,
    app_code,
  });

  res.status(201).json({
    status: "success",
    data: newApp,
  });
});

module.exports = { createNewAppHandler };
