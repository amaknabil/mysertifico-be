const {
  Role,
  User,
  App,
  Organization,
  UserRole,
  UserOrganizationRole,
} = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Email = require("../utils/sendResetPasswordEmail");
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const CustomError = require("../utils/customError");
const asyncHandler = require("express-async-handler");
const { db } = require("../config/db.config");

// --- MySertifico Signup Handler ---
const handleMySertificoSignup = asyncHandler(async (req, res) => {
  let transaction;
  try {
    const { full_name, email, password, role_name, organization_name } =
      req.body;
    transaction = await db.transaction();

    // 1. Validate
    if (!full_name || !email || !password || !role_name || !organization_name) {
      throw new CustomError("Please provide all details", 400);
    }
    if (!["Super Admin"].includes(role_name)) {
      throw new CustomError("Invalid role specified for MySertifico.", 400);
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new CustomError("User with this email already exists.", 409);
    }

    // 3. Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //4.Create Org
    const newOrg = await Organization.create(
      {
        organization_name: organization_name,
      },
      {
        transaction,
      }
    );

    //5.Create User
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const newUser = await User.create(
      {
        full_name,
        email,
        password: hashedPassword,
        verify_token: verifyToken,
        verify_token_expires_at: Date.now() + 1000 * 60 * 60 * 24, //24h
      },
      {
        transaction,
      }
    );

    // 6. Find the correct App and Role IDs
    const mySertificoApp = await App.findOne({
      where: { app_name: "MySertifico" },
    });
    const role = await Role.findOne({
      where: { role_name: role_name, app_id: mySertificoApp.app_id },
    });

    // 7. Assign the role in the user_organization_roles table
    const userOrg = await UserOrganizationRole.create(
      {
        user_id: newUser.user_id,
        organization_id: newOrg.organization_id,
        role_id: role.role_id,
      },
      { transaction }
    );

    // 7. Send Email
    const verifyUrl = `http://localhost:3000/api/auth/verify?token=${verifyToken}`;
    await sendVerificationEmail(newUser.email, newUser.full_name, verifyUrl);

    // 8. If everything is successful, commit the transaction
    await transaction.commit();

    res.status(201).json({
      message: "Account created. Check your email to verify.",
      data: newUser,
      url: verifyUrl,
      userOrg,
    });
  } catch (error) {
    // 6. If anything fails, roll back all database changes
    await transaction.rollback();
    // Re-throw the error to be caught by the main handler
    throw error;
  }
});

const handleBoSignup = asyncHandler(async (req, res) => {
  let transaction;
  try {
    transaction = await db.transaction();
    const { full_name, email, password, role_name } = req.body;

    // 1. Validate
    if (!full_name || !email || !password || !role_name) {
      throw new CustomError("Please provide all details", 400);
    }
    if (!["Admin", "Manager"].includes(role_name)) {
      throw new CustomError("Invalid role specified for BO.", 400);
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new CustomError("User with this email already exists.", 409);
    }

    // 3. Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //4.Create User
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const newUser = await User.create(
      {
        full_name,
        email,
        password: hashedPassword,
        verify_token: verifyToken,
        verify_token_expires_at: Date.now() + 1000 * 60 * 60 * 24, //24h
      },
      { transaction }
    );

    // 5. Find the correct App and Role IDs
    const boApp = await App.findOne({ where: { app_name: "Back Office" } });
    const role = await Role.findOne({
      where: { role_name: role_name, app_id: boApp.app_id },
    });

    // 6. Assign the role in the user_roles table
    const userRole = await UserRole.create(
      {
        user_id: newUser.user_id,
        role_id: role.role_id,
      },
      { transaction }
    );

    // Commit before sending email
    await transaction.commit();

    // 7. Send Email
    const verifyUrl = `http://localhost:3000/api/auth/verify?token=${verifyToken}`;
    await sendVerificationEmail(newUser.email, newUser.full_name, verifyUrl);

    res.status(201).json({
      message: "Account created. Check your email to verify.",
      data: newUser,
      url: verifyUrl,
      userRole,
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
});

const handleMyWallSignup = asyncHandler(async (req, res) => {
  let transaction;
  try {
    transaction = await db.transaction();
    const { full_name, email, password, role_name } = req.body;

    // 1. Validate input
    if (!full_name || !email || !password || !role_name) {
      throw new CustomError("Please provide all details", 400);
    }
    if (!["Parent", "Student"].includes(role_name)) {
      throw new CustomError("Invalid role specified for MyWall.", 400);
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new CustomError("User with this email already exists.", 409);
    }

    // 3. Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //4.Create User
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const newUser = await User.create(
      {
        full_name,
        email,
        password: hashedPassword,
        verify_token: verifyToken,
        verify_token_expires_at: Date.now() + 1000 * 60 * 60 * 24, //24h
      },
      { transaction }
    );

    // 5. Find the correct App and Role IDs
    const myWallApp = await App.findOne({ where: { app_name: "MyWall" } });
    const role = await Role.findOne({
      where: { role_name: role_name, app_id: myWallApp.app_id },
    });

    // 6. Assign the role in the user_roles table
    const user_role = await UserRole.create(
      { user_id: newUser.user_id, role_id: role.role_id },
      { transaction }
    );

    // Commit before sending email
    await transaction.commit();

    // 7. Send Email
    const verifyUrl = `http://localhost:3000/api/auth/verify?token=${verifyToken}`;
    await sendVerificationEmail(newUser.email, newUser.full_name, verifyUrl);

    res.status(201).json({
      message: "Account created. Check your email to verify.",
      data: newUser,
      url: verifyUrl,
      user_role,
    });
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
});

module.exports = {
  handleBoSignup,
  handleMySertificoSignup,
  handleMyWallSignup,
};

// const signUpHandlerr = asyncHandler(async (req, res) => {
//   const { full_name, email, password, app_name, role_name } = req.body;

//   if (!full_name || !email || !password || !app_name || !role_name) {
//     throw new CustomError("username,email and password required", 400);
//   }

//   const existingUser = await User.findOne({ where: { email } });
//   if (existingUser) {
//     throw new CustomError("Email already Exists", 400);
//   }

//   const role = await Role.findOne({ where: { role_name } });
//   if (!role) {
//     throw new CustomError("Role name does not exist", 400);
//   }
//   const app = await App.findOne({ where: { app_name } });
//   if (!app) {
//     throw new CustomError("App name does not exist", 400);
//   }

//   const salt = await bcryptjs.genSalt(10);
//   const hashedPassword = await bcryptjs.hash(password, salt);

//   const verifyToken = crypto.randomBytes(32).toString("hex");

//   const user = await createNewUser({
//     full_name,
//     email,
//     password: hashedPassword,
//     verify_token: verifyToken,
//     verify_token_expires_at: Date.now() + 1000 * 60 * 60 * 24, //24h
//   });

//   const user_role = await User_Role.create({
//     user_id: user.user_id,
//     role_id: role.role_id,
//     app_id: app.app_id,
//   });

//   // Send Email
//   const verifyUrl = `http://localhost:3000/api/auth/verify?token=${verifyToken}`;
//   await sendVerificationEmail(user.email, user.full_name, verifyUrl);

//   res.status(201).json({
//     message: "Account created. Check your email to verify.",
//     data: user,
//     url: verifyUrl,
//     user_role,
//   });
// });
