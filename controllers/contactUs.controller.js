const asyncHandler = require("express-async-handler");
const { Contact_Us } = require("../models");
const CustomError = require("../utils/customError");

const createContactUs = asyncHandler(async (req, res) => {
  const { name, email, message,subject } = req.body;

  if (!name || !email || !message) {
    throw new CustomError("Please provide Full Name, Email and Message dasdasd", 400);
  }
  const contactUs = await Contact_Us.create({ fullname:name, email, message,subject });

  res.status(201).json({
    message: "Contact-Us's Message successfully created",
    data: contactUs,
  });
});

const getContactUs = asyncHandler(async (req, res) => {
  const contactUsmessages = await Contact_Us.findAll();
  if (!contactUsmessages) {
    throw new CustomError("There is no message yet", 204);
  }

  res.status(200).json({
    message: "successful",
    result: contactUsmessages.length,
    data: contactUsmessages,
  });
});

module.exports = { createContactUs, getContactUs };
