const asyncHandler = require("express-async-handler");
const { findOneUser, findAllUser } = require("../services/user.service");
const { User, App } = require("../models");
const CustomError = require("../utils/customError");

const getCurrentUserHandler = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;
  const user = await findOneUser({ user_id });
  user.password = undefined;
  res.status(200).json(user);
});

const getAllUserHandler = asyncHandler(async (req, res) => {
  const users = await findAllUser();
  res.status(200).json({
    message: "success",
    result: users.length,
    users,
  });
});

const updateUserHandler = asyncHandler(async (req, res) => {
  const user_id = req.user.user_id;
  const { full_name } = req.body;
  const { app } = req.query;

  if (!app) {
    throw new CustomError("Please provide which app");
  }

  if (!full_name) {
    throw new CustomError("Please provide Full name detail");
  }

  //last coding kat sini
  const user = await User.findOne({
    where: { user_id: user_id },
    include: [
      {
        model: App,
        through: { attributes: [] },
        where: app ? { app_name: app } : undefined,
      },
    ],
  });

  res.status(200).json({
    status: "success",
    data: user,
  });
});

module.exports = {
  getCurrentUserHandler,
  getAllUserHandler,
  updateUserHandler,
};
