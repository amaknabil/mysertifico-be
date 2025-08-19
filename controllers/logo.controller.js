const { Logo } = require("../models");
const CustomError = require("../utils/customError");
const { Op } = require("sequelize");

// Get all logos with pagination
exports.getAllLogos = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const offset = (page - 1) * limit;

    const logos = await Logo.findAll({ limit, offset });

    res.status(200).json({
      success: true,
      page,
      limit,
      data: logos,
    });
  } catch (error) {
    next(error);
  }
};

// Create a new logo
exports.createLogo = async (req, res, next) => {
  try {
    const newLogo = await Logo.create(req.body);
    res.status(201).json({
      success: true,
      message: "Logo created successfully.",
      data: newLogo,
    });
  } catch (error) {
    next(error);
  }
};

// Search logos by name
exports.getLogoByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) {
      return next(new CustomError("Query parameter 'name' is required", 400));
    }

    const logos = await Logo.findAll({
      where: { file_name: { [Op.like]: `%${name}%` } },
    });

    if (!logos.length) {
      return next(new CustomError(`No logos found with name: ${name}`, 404));
    }

    res.status(200).json({ success: true, data: logos });
  } catch (error) {
    next(error);
  }
};

// Get a single logo by ID
exports.getLogoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const logo = await Logo.findByPk(id);

    if (!logo) {
      return next(new CustomError(`Logo with ID ${id} not found`, 404));
    }

    res.status(200).json({ success: true, data: logo });
  } catch (error) {
    next(error);
  }
};

// Update an existing logo
exports.updateLogo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updatedRowsCount] = await Logo.update(req.body, {
      where: { logo_id: id },
    });

    if (updatedRowsCount === 0) {
      return next(new CustomError(`Logo with ID ${id} not found for update`, 404));
    }

    const updatedLogo = await Logo.findByPk(id);

    res.status(200).json({
      success: true,
      message: "Logo updated successfully.",
      data: updatedLogo,
    });
  } catch (error) {
    next(error);
  }
};

// Delete a logo
exports.deleteLogo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRowCount = await Logo.destroy({
      where: { logo_id: id },
    });

    if (deletedRowCount === 0) {
      return next(new CustomError(`Logo with ID ${id} not found for deletion`, 404));
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
