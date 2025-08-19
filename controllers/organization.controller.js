const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/customError");
const { db } = require("../config/db.config");
const { User, UserOrganizationRole, Role, Organization } = require("../models");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const Email = require("../utils/sendInviteEmail");
const { Op } = require("sequelize");

//kiv
const inviteUserHandler = asyncHandler(async (req, res) => {
  const { full_name, email, role_name } = req.body;
  const { organization_id } = req.params;

  if (!full_name || !email || !role_name) {
    throw new CustomError("Please provide all detail to assign member", 400);
  }

  // --- Start Transaction ---
  const transaction = await db.transaction();
  let user;
  let organization;
  let role;
  let temporaryPassword = null;
  let verifyToken = null;

  // --- Block 1: Database Operations ---
  try {
    user = await User.findOne({ where: { email: email } });

    if (user) {
      const isAlreadyMember = await UserOrganizationRole.findOne({
        where: { user_id: user.user_id, organization_id: organization_id },
      });
      if (isAlreadyMember) {
        throw new CustomError(
          "This user is already a member of this organization.",
          409
        );
      }
    }

    if (!user) {
      temporaryPassword = crypto.randomBytes(8).toString("hex");
      const hashedPassword = await bcryptjs.hash(temporaryPassword, 12);
      verifyToken = crypto.randomBytes(32).toString("hex");

      user = await User.create(
        {
          full_name,
          email,
          password: hashedPassword,
          verify_token: verifyToken,
          verify_token_expires_at: Date.now() + 1000 * 60 * 60 * 24,
        },
        { transaction }
      );
    }

    organization = await Organization.findByPk(organization_id);
    role = await Role.findOne({ where: { role_name: role_name } });

    if (!organization || !role) {
      throw new CustomError("Invalid organization or role specified.", 404);
    }

    await UserOrganizationRole.create(
      {
        user_id: user.user_id,
        organization_id: organization_id,
        role_id: role.role_id,
      },
      { transaction }
    );

    // If all database operations succeed, commit the transaction.
    await transaction.commit();
  } catch (error) {
    // If any database operation fails, roll everything back.
    if (transaction) await transaction.rollback();
    // Re-throw the error to be handled by your global error handler
    throw error;
  }

  // --- Block 2: External Service Call (Email) ---
  // This code only runs if the transaction was successful.
  try {
    if (temporaryPassword) {
      const loginUrl = `http://localhost:3000/api/organizations/verify?token=${verifyToken}`;
      await new Email({ email: user.email, full_name: user.full_name })._send(
        "inviteEmail",
        `You're invited to join ${organization.organization_name}!`,
        {
          organizationName: organization.organization_name,
          temporaryPassword: temporaryPassword,
          loginUrl: loginUrl,
          email: user.email,
        }
      );
    } else {
      await new Email({ email: user.email, full_name: user.full_name })._send(
        "inviteEmail",
        `You've been added to ${organization.organization_name}`,
        {
          organizationName: organization.organization_name,
          roleName: role.role_name,
          email: user.email,
        }
      );
    }
  } catch (emailError) {
    // IMPORTANT: The user was created successfully, but the email failed to send.
    // You should log this error for your records. Don't throw an error back to the client,
    // because the main action (inviting the user) was successful.
    console.error(`Email failed to send to ${user.email}:`, emailError);
  }

  // --- Block 3: Success Response ---
  // Send the final success response, regardless of whether the email sent.
  res.status(201).json({
    message: `${user.full_name} has been successfully invited to ${organization.organization_name} as a(n) ${role.role_name}.`,
  });
});

const getAllOrganization = asyncHandler(async (req, res) => {
  // --- 1. Pagination ---
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 per page
  const offset = (page - 1) * limit;

  // --- 2. Optional Search ---
  const { search } = req.query;
  const whereClause = {};
  if (search) {
    whereClause.organization_name = { [Op.like]: `%${search}%` };
  }

  // --- 3. Fetch Data ---
  const { count, rows: organizations } = await Organization.findAndCountAll({
    where: whereClause,
    limit: limit,
    offset: offset,
    order: [["organization_name", "ASC"]], // Order alphabetically
  });

  // --- 4. Send Response ---
  res.status(200).json({
    status: "success",
    data: {
      totalOrganizations: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      organizations: organizations,
    },
  });
});

//change organisation is_active/status
const updateOrganizationStatus = asyncHandler(async (req, res) => {
  const { organization_id } = req.params;

  const organization = await Organization.findOne({
    where: { organization_id: organization_id },
  });

  if (!organization) {
    throw new CustomError("There is no organization with that id");
  }

  organization.is_active = !organization.is_active;

  await organization.save();

  res.status(200).json({
    status: "success",
    data: organization,
  });
});

const getAllOrganizationUsersHandler = asyncHandler(async (req, res) => {
  // --- 1. Get Parameters ---
  const { q, page = 1, limit = 10 } = req.query;
  const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

  // --- 2. Build Search Clause (if applicable) ---
  const userWhereClause = {};
  if (q) {
    userWhereClause[Op.or] = [
      { full_name: { [Op.like]: `%${q}%` } },
      { email: { [Op.like]: `%${q}%` } },
    ];
  }

  // --- 3. Fetch Data ---
  const { count, rows } = await UserOrganizationRole.findAndCountAll({
    limit: parseInt(limit, 10),
    offset,
    distinct: true, // Important for accurate counts with joins
    // Filter directly on the main table for the organization
    // Include associated models to get all necessary details
    include: [
      {
        model: User,
        where: userWhereClause, // Apply search filter here
        required: true, // Ensures we only get records with a valid user
        attributes: {
          exclude: ["password", "verify_token", "verify_token_expires_at"],
        },
      },
      {
        model: Role,
        required: true,
        attributes: ["role_name"],
      },
      {
        model: Organization,
        required: true,
        attributes: ["organization_name"],
      },
    ],
    order: [
      [User, "createdAt", "DESC"], // Order by user creation date
    ],
  });

  // --- 4. Transform the data for a clean response ---
  const users = rows.map((item) => {
    return {
      user_id: item.User.user_id,
      full_name: item.User.full_name,
      email: item.User.email,
      is_active: item.is_active, // Get status from the join table
      createdAt: item.User.createdAt,
      organization_name: item.Organization.organization_name,
      role_name: item.Role.role_name,
    };
  });

  // --- 5. Send Response ---
  res.status(200).json({
    status: "success",
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / parseInt(limit, 10)),
      currentPage: parseInt(page, 10),
    },
    data: users,
  });
});

const updateOrganizationUserStatusHandler = asyncHandler(async (req, res) => {
  // --- 1. Get Identifiers and New Status ---
  const { organization_id, user_id } = req.params;


  // --- 3. Find the specific user-organization record ---
  // This record uniquely links a user to an organization with a specific role and status.
  const userOrgRole = await UserOrganizationRole.findOne({
    where: {
      organization_id: organization_id,
      user_id: user_id,
    },
  });

  if (!userOrgRole) {
    throw new CustomError(
      "The specified user was not found in this organization.",
      404
    );
  }

  // --- 4. Update and Save the Status ---
  userOrgRole.is_active = !userOrgRole.is_active;
  await userOrgRole.save();

  // --- 5. Send Success Response ---
  const statusMessage = userOrgRole.is_active ? "activated" : "deactivated";
  res.status(200).json({
    status: "success",
    message: `User has been successfully ${statusMessage} within the organization.`,
    data: userOrgRole,
  });
});

module.exports = {
  inviteUserHandler,
  getAllOrganization,
  updateOrganizationStatus,
  getAllOrganizationUsersHandler,
  updateOrganizationUserStatusHandler,
};
