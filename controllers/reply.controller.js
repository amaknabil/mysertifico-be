const { Contact_Us } = require("../models");
const CustomError = require("../utils/customError");
const { sendEmail } = require("../utils/email.utils");

// PATCH /api/support/:id/reply
exports.sendReply = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reply, status } = req.body;

    const inquiry = await Contact_Us.findByPk(id);

    if (!inquiry) {
      return next(new CustomError(`Inquiry with ID ${id} not found`, 404));
    }

    // Update the inquiry in the database
    const updatedInquiry = await inquiry.update({
      reply: reply, // Assuming you have a 'reply' column in your model
      status: status || 'in progress' // Set to 'in progress' if status is not provided
    });

    // Send the email to the user
    await sendEmail({
      to: inquiry.email,
      subject: `Re: ${inquiry.subject}`,
      html: `<p>Dear ${inquiry.fullname},</p><p>Thank you for contacting us. Here is our reply:</p><p>${reply}</p>`,
    });

    res.status(200).json({
      success: true,
      message: "Reply sent and inquiry updated successfully.",
      data: updatedInquiry,
    });
  } catch (error) {
    next(error);
  }
};