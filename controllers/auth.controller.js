const asyncHandler = require("express-async-handler");
const {
  createNewUser,
  findOneUser,
  correctPassword,
  createToken,
  createCookieOpt,
} = require("../services/user.service");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const {
  JWT_EPIRES_IN,
  JWT_SECRET,
  JWT_COOKIE_EXPIRES_IN,
  NODE_ENV,
} = require("../config/env.config");
const Email = require("../utils/sendResetPasswordEmail");
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const CustomError = require("../utils/customError");

const signUpHandler = asyncHandler(async (req, res) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    throw new CustomError("username,email and password required",400);
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new CustomError("Email already Exists",400)
  }

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const verifyToken = crypto.randomBytes(32).toString("hex");

  const user = await createNewUser({
    full_name,
    email,
    password: hashedPassword,
    verify_token: verifyToken,
    verify_token_expires_at: Date.now() + 1000 * 60 * 60 * 24, //24h
  });

  // Send Email
  const verifyUrl = `http://localhost:3000/api/auth/verify?token=${verifyToken}`;
  await sendVerificationEmail(user.email, user.full_name, verifyUrl);

  res.status(201).json({
    message: "Account created. Check your email to verify.",
    data: user,
    url: verifyUrl,
  });
});

const verifyEmailHandler = asyncHandler(async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ where: { verify_token: token } });
  if (!user || user.verify_token_expires_at < new Date()) {
    throw new CustomError("Invalid or expired token",400);
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
    throw new CustomError("Please provive email and password",401);
  }

  //Find user
  const user = await findOneUser({ email, is_active: 1 });
  if (!user) {
    throw new CustomError("Invalid email or password or user does not exist",401);
  }

  //Verify password
  const passwordIsValid = await correctPassword(password, user.password);
  if (!passwordIsValid) {
    throw new CustomError("Invalid email and password",401);
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

    const oldUser = await User.findOne({ where: { email: email } });

    if (!oldUser) {
      throw new CustomError("This user's email does not exist",400);
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign(
      { email: oldUser.email, user_id: oldUser.user_id },
      secret,
      {
        expiresIn: "5m",
      }
    );

    //change
    const urlLink = `http://localhost:3000/api/auth/reset-password/${oldUser.user_id}/${token}`;

    await new Email(oldUser, urlLink).sendPasswordReset();

    res.status(200).json({
      message: "success",
      urlLink,
    });
});

const resetPasswordHandler = asyncHandler(async (req, res) => {
 
    const { id, token } = req.params;
    const { password } = req.body;
    const oldUser = await User.findOne({ where: { id } });
    if (!oldUser) {
      throw new CustomError("This user's email does not exist",400);
    }
    const secret = JWT_SECRET + oldUser.password;
    const isVerified = jwt.verify(token, secret);

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    await User.update({ password: hashedPassword }, { where: { id } });

    res.status(200).json({
      message: "Pasword Updated",
    });
});

const changePasswordHandler = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, newConfirmPassword } = req.body;
  const user_id = req.user.user_id;

  if (!currentPassword || !newPassword || !newConfirmPassword) {
    throw new CustomError("All fields are required",400);
  }

  if (newPassword !== newConfirmPassword) {
    return res.status(400).json({
      message: "New passwords do not match",
    });
  }

  const samePassword = await bcrypt.compare(newPassword, currentUser.password);
  if (samePassword) {
    throw new CustomError("New password cannot be same as current password",400);
  }

  const currentUser = await User.findOne({ where: { user_id } });

  const isMatch = await bcryptjs.compare(currentPassword, currentUser.password);
  if (!isMatch) {
    throw new CustomError("Current password is incorrect",401);
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
