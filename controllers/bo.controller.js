const asyncHandler = require("express-async-handler");
const { User, Role, UserRole, App, sequelize } = require("../models");
const CustomError = require("../utils/customError");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const Email = require("../utils/sendInviteEmail");
const { LOGIN_URL } = require("../config/env.config");
const { Op } = require("sequelize");

const updateBOHandler = asyncHandler(async (req, res) => {
  const { full_name } = req.body;
  const user_id = req.user.user_id;

  if (!full_name) {
    throw new CustomError("Please provide full name details", 400);
  }

  const user = await User.findOne({ where: { user_id } });

  if (!user) {
    // This case is unlikely if the auth middleware is working, but it's good practice.
    throw new CustomError("User not found.", 404);
  }

  user.full_name = full_name;
  await user.save();

  // Hide sensitive data before sending the response
  user.password = undefined;

  // Return the updated user object
  res.status(200).json({
    status: "success",
    message: "User details updated successfully.",
    data: user,
  });
});

const addBoUserHandler = asyncHandler(async (req, res) => {
  const { full_name, email, role_name } = req.body;

  // 1. Validate input
  if (!full_name || !email || !role_name) {
    throw new CustomError(
      "Please provide full name, email, and role name.",
      400
    );
  }
  if (!["Admin", "Manager", "Super Admin"].includes(role_name)) {
    throw new CustomError("Invalid role specified for Back Office.", 400);
  }

  const transaction = await sequelize.transaction();
  let user;
  let userRole;
  let tempPassword = null;
  let isNewUser = false;

  try {
    // 2. Find the necessary App and Role outside the main logic to avoid repetition
    const boApp = await App.findOne({ where: { app_name: "Back Office" } });
    if (!boApp) {
      throw new CustomError(
        "Back Office application not found in database.",
        500
      );
    }

    const role = await Role.findOne({
      where: { role_name: role_name, app_id: boApp.app_id },
    });
    if (!role) {
      throw new CustomError(
        `Role '${role_name}' not found for the Back Office application.`,
        404
      );
    }

    // 3. Check if the user already exists
    let existingUser = await User.findOne({ where: { email } });

    if (!existingUser) {
      // --- Scenario: Create a NEW user ---
      isNewUser = true;
      tempPassword = crypto.randomBytes(6).toString("base64url");
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(tempPassword, salt);

      user = await User.create(
        {
          full_name,
          email,
          password: hashedPassword,
          is_active: true, // Manually added users are active by default
        },
        { transaction }
      );
    } else {
      // --- Scenario: Use an EXISTING user ---
      user = existingUser;
      // Check if the user already has this specific role
      const existingRole = await UserRole.findOne({
        where: { user_id: user.user_id, role_id: role.role_id },
      });
      if (existingRole) {
        throw new CustomError(
          `User ${email} already has the role '${role_name}'.`,
          409
        );
      }
    }

    // 4. Assign the role in the user_roles table
    userRole = await UserRole.create(
      {
        user_id: user.user_id,
        role_id: role.role_id,
      },
      { transaction }
    );

    // 5. If all database operations succeed, commit the transaction.
    await transaction.commit();
  } catch (error) {
    // If any error occurs, roll back the transaction
    if (transaction) await transaction.rollback();
    throw error; // Re-throw the error to be handled by the global error handler
  }

  // 6. Send email AFTER the transaction is successfully committed
  try {
    const emailClient = new Email({
      email: user.email,
      full_name: user.full_name,
    });
    if (isNewUser && tempPassword) {
      // Call your specific BO invite method for new users
      await emailClient.newUserInviteBO({
        temporaryPassword: tempPassword,
        loginUrl: LOGIN_URL, // Replace with your actual BO login URL
        roleName: role_name,
        full_name: user.full_name,
      });
    } else {
      // Call your specific BO notice method for existing users
      await emailClient.existingUserNoticeBO({
        loginUrl: LOGIN_URL,
        roleName: role_name,
        full_name: user.full_name,
      });
    }
  } catch (emailError) {
    // Log the email error but don't fail the request, as the user was created successfully
    console.error(
      `Email failed to send to ${user.email} after BO user creation:`,
      emailError
    );
  }

  // 7. Send the final success response
  const successMessage = isNewUser
    ? `New user ${user.full_name} created and assigned the role of ${role_name}. An email with a temporary password has been sent.`
    : `Existing user ${user.full_name} has been assigned the new role of ${role_name}.`;

  res.status(201).json({
    message: successMessage,
    data: {
      userId: user.user_id,
      roleAssigned: userRole,
    },
  });
});

const getAllBOUsersHandler = asyncHandler(async (req, res) => {
  // 1. Get page and limit from query parameters, with default values
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  // 2. Find the "Back Office" application to get its ID
  const boApp = await App.findOne({ where: { app_name: "Back Office" } });

  if (!boApp) {
    throw new CustomError(
      "Back Office application not found in the database.",
      500
    );
  }

  // 3. Use findAndCountAll to get users with total count for pagination
  const { count, rows: users } = await User.findAndCountAll({
    limit,
    offset,
    distinct: true, // Add distinct to ensure the count is accurate with joins
    attributes: ["user_id", "full_name", "email", "is_active", "createdAt"],
    include: [
      {
        model: Role,
        as: "Roles",
        attributes: ["role_id", "role_name"],
        where: {
          app_id: boApp.app_id,
        },
        through: {
          attributes: [],
        },
      },
    ],
    required: true,
    order: [["createdAt", "DESC"]], // Optional: Order users by creation date
  });

  // 4. Return the paginated list of users with metadata
  res.status(200).json({
    status: "success",
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      limit: limit,
    },
    data: users,
  });
});

const searchBOUsersHandler = asyncHandler(async (req, res) => {
  // 1. Get search, page, and limit from query parameters
  const { q } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  if (!q) {
    throw new CustomError("Please provide a search term.", 400);
  }

  // 2. Find the "Back Office" application to get its ID
  const boApp = await App.findOne({ where: { app_name: "Back Office" } });

  if (!boApp) {
    throw new CustomError(
      "Back Office application not found in the database.",
      500
    );
  }

  // 3. Use findAndCountAll with the search query and pagination options
  const { count, rows: users } = await User.findAndCountAll({
    limit,
    offset,
    distinct: true,
    where: {
      [Op.or]: [
        { full_name: { [Op.like]: `%${q}%` } },
        { email: { [Op.like]: `%${q}%` } },
      ],
    },
    attributes: ["user_id", "full_name", "email", "is_active", "createdAt"],
    include: [
      {
        model: Role,
        as: "Roles",
        attributes: ["role_id", "role_name"],
        where: {
          app_id: boApp.app_id,
        },
        through: {
          attributes: [],
        },
      },
    ],
    required: true,
    order: [["createdAt", "DESC"]],
  });

  // 4. Return the paginated search results
  res.status(200).json({
    status: "success",
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      limit: limit,
    },
    data: users,
  });
});

const updateBOUserStatusHandler = asyncHandler(async (req, res) => {
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
  updateBOHandler,
  addBoUserHandler,
  getAllBOUsersHandler,
  searchBOUsersHandler,
  updateBOUserStatusHandler,
};
