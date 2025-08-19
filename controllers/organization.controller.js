const asyncHandler = require("express-async-handler");
const CustomError = require("../utils/customError");
const { db } = require("../config/db.config");
const {
  User,
  UserOrganizationRole,
  Role,
  Organization,
} = require("../models");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const Email = require("../utils/sendInviteEmail");
const { Op } = require("sequelize");

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

const verifyUserOrganization = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ where: { verify_token: token } });
  if (!user || user.verify_token_expires_at < new Date()) {
    throw new CustomError("Invalid or expired token", 400);
  }

  user.is_active = true;
  user.verify_token = null;
  user.verify_token_expires_at = null;
  await user.save();

  res.status(201).json({
    message: "Successfully created",
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

module.exports = {
  inviteUserHandler,
  verifyUserOrganization,
  getAllOrganization,
  updateOrganizationStatus,
};
