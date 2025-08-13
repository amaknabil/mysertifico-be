const asyncHandler = require("express-async-handler");
const {
  User,
  App,
  UserOrganizationRole,
  Organization,
  Role,
} = require("../models");
const CustomError = require("../utils/customError");
const { Op } = require("sequelize");

const getUserHandler = asyncHandler(async (req, res) => {
  // --- 1. Pagination (applies to both getting all and searching) ---
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  // --- 2. Differentiate: Check if there are search queries ---
  const allowedSearchParams = ["full_name", "email", "is_active"];
  const whereClause = {};
  let isSearching = false;

  for (const key in req.query) {
    if (allowedSearchParams.includes(key)) {
      isSearching = true; // A valid search parameter was found
      if (key === "full_name" || key === "email") {
        whereClause[key] = { [Op.like]: `%${req.query[key]}%` };
      } else {
        whereClause[key] = req.query[key];
      }
    }
  }

  // --- 3. Fetch Data ---
  const { count, rows: users } = await User.findAndCountAll({
    where: whereClause, // Will be empty {} if not searching, which finds all
    limit: limit,
    offset: offset,
    attributes: {
      exclude: ["password", "verify_token", "verify_token_expires_at"],
    },
  });

  // --- 4. Send Response ---
  const message = isSearching
    ? "Users matching your search criteria."
    : "All users retrieved.";

  if (count === 0) {
    return res
      .status(200)
      .json({ status: "success", message: "No users found." });
  }

  res.status(200).json({
    status: "success",
    message,
    data: {
      totalUsers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      users: users,
    },
  });
});

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

const updateUserStatusHandler = asyncHandler(async (req, res) => {
  const { user_id } = req.params;

  const user = await User.findOne({ where: { user_id: user_id } });

  if (!user) {
    throw new CustomError("User not found.", 404);
  }

  //switch status from active to unactive and vice-versa
  user.is_active = !user.is_active;

  await user.save();
  user.password = undefined;

  res.status(200).json({
    status: "success",
    message: `User status updated to: ${
      user.is_active ? "Active" : "Inactive"
    }`,
    data: user,
  });
});

module.exports = {
  getCurrentUserHandler,
  getUserHandler,
  updateUserHandler,
  updateUserStatusHandler,
};
