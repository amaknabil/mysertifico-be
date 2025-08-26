const asyncHandler = require("express-async-handler");
const {
  findOneUser,
  correctPassword,
  createToken,
  createCookieOpt,
} = require("../services/user.service");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
// [CHANGE] Added BASE_URL to the require statement
const { JWT_SECRET, BASE_URL } = require("../config/env.config");
const Email = require("../utils/sendResetPasswordEmail");
const CustomError = require("../utils/customError");
const crypto = require("crypto");
const {
  handleMyWallSignup,
  handleBoSignup,
  handleMySertificoSignup,
} = require("../services/auth.service");

const signUpHandler = asyncHandler(async (req, res) => {
  const { app_name } = req.body;

  switch (app_name) {
    case "mywall":
      await handleMyWallSignup(req, res);
      break;
    case "bo":
      await handleBoSignup(req, res);
      break;
    case "mysertifico":
      await handleMySertificoSignup(req, res);
      break;
    default:
      throw new CustomError("Invalid source application specified.", 400);
  }
});

const verifyEmailHandler = asyncHandler(async (req, res) => {
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

const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check if pass and email provided
  if (!email || !password) {
    throw new CustomError("Please provive email and password", 401);
  }

  //Find user
  const user = await findOneUser({ email });
  if (!user) {
    throw new CustomError(
      "Invalid email or password or user does not exist",
      401
    );
  }

  if (!user.is_active) {
    throw new CustomError(
      "Account not verified. Please check your email.",
      403
    );
  }

  //Verify password
  const passwordIsValid = await correctPassword(password, user.password);
  if (!passwordIsValid) {
    throw new CustomError("Invalid email and password", 401);
  }

  //create JWT
  const token = createToken(user);
  user.password = undefined;

  const cookieOpt = createCookieOpt();

  res.cookie("jwt", token, cookieOpt);

  res.status(200).json({
    message: "success login",
    data: user,
    token,
  });
});

const logoutHandeler = asyncHandler(async (req, res) => {
  const cookieOpt = createCookieOpt();
  res.clearCookie("jwt", cookieOpt);
  res.status(200).json({ status: "success logout" });
});

const forgotPasswordHandler = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email: email } });
  // [CHANGE] Check for user existence
  if (!user) {
    throw new CustomError("There is no user with that email address.", 404);
  }

  const temporaryPassword = crypto.randomBytes(6).toString("base64url");
  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(temporaryPassword, salt);

  user.password = hashedPassword;
  await user.save();

  await new Email(user).sendPasswordReset(temporaryPassword);

  res.status(200).json({
    message: "Password reset email sent successfully.",
    temporaryPassword
  });
});

const resetPasswordHandler = asyncHandler(async (req, res) => {
  // [CHANGE] Changed from id and token params to just token
  const { token } = req.params;
  const { password } = req.body;

  // [CHANGE] Use new resetPasswordToken and resetPasswordExpiresAt fields for lookup
  const user = await User.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpiresAt: { [Op.gt]: Date.now() },
    },
  });

  if (!user) {
    throw new CustomError("Invalid or expired password reset token.", 400);
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  // [CHANGE] Update user password and clear reset token fields
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpiresAt = null;
  await user.save();

  res.status(200).json({
    message: "Password has been reset successfully.",
  });
});

const changePasswordHandler = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, newConfirmPassword } = req.body;
  const user_id = req.user.user_id;

  if (!currentPassword || !newPassword || !newConfirmPassword) {
    throw new CustomError("All fields are required", 400);
  }

  if (newPassword !== newConfirmPassword) {
    return res.status(400).json({
      message: "New passwords do not match",
    });
  }

  // [CHANGE] Fetch the current user before checking the password
  const currentUser = await User.findOne({ where: { user_id } });

  // [CHANGE] Moved password comparison after fetching the user
  const samePassword = await bcryptjs.compare(
    newPassword,
    currentUser.password
  );
  if (samePassword) {
    throw new CustomError(
      "New password cannot be same as current password",
      400
    );
  }

  const isMatch = await bcryptjs.compare(currentPassword, currentUser.password);
  if (!isMatch) {
    throw new CustomError("Current password is incorrect", 401);
  }

  const salt = await bcryptjs.genSalt(10);
  const newHashedPassword = await bcryptjs.hash(newPassword, salt);
  currentUser.password = newHashedPassword;

  await currentUser.save();
  res.status(200).json({ message: "Password updated successfully" });
});

module.exports = {
  signUpHandler,
  loginHandler,
  logoutHandeler,
  forgotPasswordHandler,
  resetPasswordHandler,
  verifyEmailHandler,
  changePasswordHandler,
};