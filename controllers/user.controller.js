const asyncHandler = require("express-async-handler");
const { findOneUser, findAllUser } = require("../services/user.service");
const {
  User,
  App,
  UserOrganizationRole,
  Organization,
  Role,
} = require("../models");
const CustomError = require("../utils/customError");

const getCurrentUserHandler = asyncHandler(async (req, res) => {
  // 1. Get the user ID from the JWT.
  const user_id = req.user.user_id;

  // 2. Find all entries in the junction table for this user.
  // Include the associated Organization and Role data.
  const userAccountRoles = await UserOrganizationRole.findAll({
    where: { user_id: user_id },
    include: [
      {
        model: Organization,
        attributes: ["organization_id", "organization_name"],
      },
      {
        model: Role,
        attributes: ["role_name"],
      },
    ],
  });

  // 3. Format the data into a clean array for the frontend.
  const accounts = userAccountRoles.map((account) => ({
    organizationId: account.Organization.organization_id,
    organizationName: account.Organization.organization_name,
    userRole: account.Role.role_name,
  }));

  res.status(200).json({
    status: "success",
    result: accounts.length,
    accounts: accounts,
  });
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
