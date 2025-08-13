const { Op } = require("sequelize");
const { User, Role, App, UserRole } = require("../models");
const CustomError = require("../utils/customError");
const asyncHandler = require("express-async-handler");

const getMyWallUsersHandler = asyncHandler(async (req, res) => {
  // --- 1. Pagination ---
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  // --- 2. Build Search Clause for User ---
  const allowedSearchParams = ["full_name", "email"];
  const userWhereClause = {};
  let isSearching = false;

  for (const key in req.query) {
    if (allowedSearchParams.includes(key)) {
      isSearching = true;
      userWhereClause[key] = { [Op.like]: `%${req.query[key]}%` };
    }
  }

  // --- 3. Fetch Data starting from UserRole ---
  const { count, rows: userRoles } = await UserRole.findAndCountAll({
    limit: limit,
    offset: offset,
    include: [
      {
        model: User,
        where: userWhereClause, // Apply search filters here
        required: true,
        attributes: {
          exclude: ["password", "verify_token", "verify_token_expires_at"],
        },
      },
      {
        model: Role,
        required: true,
        attributes: ["role_name", "role_id"],
        include: [
          {
            model: App,
            where: { app_name: "MyWall" }, // Filter by App name here
            required: true,
            attributes: [],
          },
        ],
      },
    ],
  });

  // --- 4. Transform the data to get a clean list of users ---
  // The result is an array of UserRole objects, so we extract the User from each.
  const users = userRoles.map((userRole) => {
    // 1. Convert the Sequelize User instance to a plain JavaScript object
    const userObject = userRole.User.get({ plain: true });

    // 2. Add the role_name from the nested Role object to the user object
    userObject.role_name = userRole.Role.role_name;
    userObject.role_id = userRole.Role.role_id;

    return userObject;
  });

  // --- 5. Send Response ---
  const message = isSearching
    ? "MyWall users matching your search criteria."
    : "All MyWall users retrieved.";

  res.status(200).json({
    status: "success",
    message,
    data: {
      totalUsers: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      users: users, // Send the transformed user list
    },
  });
});

//change mywall status from inactive to active and vice versa
const updateMyWallUserStatus = asyncHandler(async (req, res) => {
  const { user_id, role_id } = req.params;

  const user = await UserRole.findOne({
    where: { user_id: user_id, role_id: role_id },
  });

  if (!user) {
    throw new CustomError("There is no user with that id and role id");
  }

  user.is_active = !user.is_active;

  await user.save();

  res.status(200).json({
    status: `succes change status for this user to ${user.is_active}`,
  });
});

module.exports = { getMyWallUsersHandler, updateMyWallUserStatus };
