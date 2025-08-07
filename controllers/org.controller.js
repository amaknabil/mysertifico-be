
const asyncHandler = require("express-async-handler");
const { Organization } = require("../models");
const CustomError = require("../utils/customError");

const getAllOrganizationsHandler = asyncHandler(async (req, res) => {
  const organizations = await Organization.findAll();

  res.status(200).json({
    status: "success",
    result: organizations.length,
    organizations,
  });
});

module.exports = {
  getAllOrganizationsHandler,
};
