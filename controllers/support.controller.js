const { Contact_Us } = require("../models");
const CustomError = require("../utils/customError");
const { Op } = require("sequelize");

// Get all support inquiries with search and pagination 
exports.getAllSupportInquiries = async (req, res, next) => {
  try {
    const { email, page, limit } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 12;
    const offset = (pageNumber - 1) * pageSize;

    const whereCondition = {};
    if (email) {
      whereCondition.email = { [Op.like]: `%${email}%` };
    }

    const { count, rows } = await Contact_Us.findAndCountAll({
      where: whereCondition,
      limit: pageSize,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      success: true,
      data: rows,
      totalCount: count,
      page: pageNumber,
      limit: pageSize,
    });
  } catch (error) {
    next(error);
  }
};

//Get a single support inquiry by ID 
exports.getSupportInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const inquiry = await Contact_Us.findByPk(id);

    if (!inquiry) {
      return next(new CustomError(`Inquiry with ID ${id} not found`, 404));
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};