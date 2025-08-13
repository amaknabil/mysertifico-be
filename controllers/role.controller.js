const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/customError");
const { Role, App } = require("../models");

const createNewRoleHandler = asyncHandler(async (req, res) => {
  const { role_name } = req.body;
  const { app_code } = req.query;

  if (!role_name || !app_code) {
    throw new CustomError("Please provide Role and App Name", 400);
  }

  const app = await App.findOne({ where: { app_code: app_code } });

  const role = await Role.create({ role_name, app_id: app.app_id });

  res.status(201).json({
    status: "success",
    role,
  });
});

module.exports = { createNewRoleHandler };
