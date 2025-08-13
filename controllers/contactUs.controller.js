const asyncHandler = require("express-async-handler");
const { ContactUs } = require("../models");
const CustomError = require("../utils/customError");

const createContactUs = asyncHandler(async (req, res) => {
  const { fullname, email, message } = req.body;

  if (!fullname || !email || !message) {
    throw new CustomError("Please provide Full Name, Email and Message", 400);
  }
  const contactUs = await ContactUs.create({ fullname, email, message });

  res.status(201).json({
    message: "Contact-Us's Message successfully created",
    data: contactUs,
  });
});

const getContactUs = asyncHandler(async (req, res) => {
  const contactUsmessages = await ContactUs.findAll();
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
