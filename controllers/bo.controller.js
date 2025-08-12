const asyncHandler = require("express-async-handler");
const { User } = require("../models");
const CustomError = require("../utils/customError");

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

module.exports = { updateBOHandler };
