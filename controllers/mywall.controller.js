// amaknabil/mysertifico-be/mysertifico-be-dev/controllers/mywall.controller.js
const { Op } = require("sequelize");
const { User, Role, App, UserRole, Plan, UserPlan } = require("../models");
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
    // CHANGE 1: Specify which attributes to get from the UserRole table
    attributes: ["is_active"], 
    include: [
      {
        model: User,
        where: userWhereClause,
        required: true,
        attributes: {
          // CHANGE 2: Exclude is_active from the User model to avoid naming conflicts
          exclude: ["password", "verify_token", "verify_token_expires_at", "is_active"],
        },
      },
      {
        model: Role,
        required: true,
        attributes: ["role_name", "role_id"],
        include: [
          {
            model: App,
            where: { app_name: "MyWall" },
            required: true,
            attributes: [],
          },
        ],
      },
    ],
  });

  // --- 4. Transform the data to get a clean list of users ---
  const users = userRoles.map((userRole) => {
    const userObject = userRole.User.get({ plain: true });
    
    userObject.role_name = userRole.Role.role_name;
    userObject.role_id = userRole.Role.role_id;
    // CHANGE 3: Add the is_active status from the UserRole record to the final object
    userObject.is_active = userRole.is_active;

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
      users: users,
    },
  });
});

const manageMyWallUserHandler = asyncHandler(async (req, res) => {
  const { user_id, role_id } = req.params;
  const { plan_name, is_active } = req.body;

  // --- 1. Find the UserRole entry ---
  const userRole = await UserRole.findOne({
    where: { user_id: user_id, role_id: role_id },
  });

  if (!userRole) {
    throw new CustomError("The specified user and role combination was not found.", 404);
  }

  // --- 2. Update Account Status (if provided) ---
  if (is_active !== undefined && typeof is_active === 'boolean') {
    userRole.is_active = is_active;
  }

  // --- 3. Update Subscription Plan (if provided) ---
  if (plan_name) {
    const myWallApp = await App.findOne({ where: { app_name: "MyWall" } });
    if (!myWallApp) {
      throw new CustomError("MyWall application configuration not found.", 500);
    }

    const newPlan = await Plan.findOne({
      where: { plan_name: plan_name, app_id: myWallApp.app_id },
    });

    if (!newPlan) {
      throw new CustomError(`Plan '${plan_name}' is not a valid plan for MyWall.`, 400);
    }

    const userPlan = await UserPlan.findOne({
      where: { user_id: user_id },
      include: [{ model: Plan, where: { app_id: myWallApp.app_id }, required: true }]
    });

    if (userPlan) {
      userPlan.plan_id = newPlan.plan_id;
      await userPlan.save();
    } else {
      // Optional: Create a new plan subscription if one doesn't exist
      await UserPlan.create({
        user_id: user_id,
        plan_id: newPlan.plan_id,
        start_date: new Date(),
        // Set an appropriate end_date based on your business logic
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        status: 'active'
      });
    }
  }

  // --- 4. Save Changes and Respond ---
  await userRole.save();

  res.status(200).json({
    status: 'success',
    message: "MyWall user details updated successfully.",
    data: {
      user_id: userRole.user_id,
      is_active: userRole.is_active,
      plan_name: plan_name || "No change"
    }
  });
});

module.exports = { getMyWallUsersHandler, manageMyWallUserHandler };