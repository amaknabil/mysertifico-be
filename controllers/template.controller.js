const { Template } = require("../models");
const CustomError = require("../utils/customError");
const { Op } = require("sequelize");

// Controller function to get all templates with pagination and search
exports.getAllTemplates = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const offset = (page - 1) * limit;

    const { name, id } = req.query;
    let searchConditions = {};

    if (id && name) {
      // Both must match (AND condition)
      searchConditions = {
        [Op.and]: [
          { template_id: id },
          { title: { [Op.like]: `%${name}%` } },
        ],
      };
    } else if (id) {
      searchConditions = { template_id: id }; // Exact match
    } else if (name) {
      searchConditions = { title: { [Op.like]: `%${name}%` } }; // Partial match
    }

    const templates = await Template.findAll({
      where: searchConditions,
      limit,
      offset,
    });

    res.status(200).json({
      success: true,
      page,
      limit,
      data: templates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve templates.",
      error: error.message,
    });
  }
};

// Count all templates
exports.countAllTemplates = async (req, res) => {
  try {
    const totalCount = await Template.count();
    res.status(200).json({ success: true, total: totalCount });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to count templates.",
      error: error.message,
    });
  }
};

// Create new template
exports.createTemplate = async (req, res) => {
  try {
    const newTemplate = await Template.create(req.body);
    res.status(201).json({
      success: true,
      message: "Template created successfully.",
      data: newTemplate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create new template.",
      error: error.message,
    });
  }
};

// Get single template by ID
exports.getTemplateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const template = await Template.findByPk(id);

    if (!template) {
      return next(new CustomError(`Template with ID ${id} not found`, 404));
    }

    res.status(200).json({ success: true, data: template });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve template.",
      error: error.message,
    });
  }
};

// Update template
exports.updateTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updatedRowsCount] = await Template.update(req.body, {
      where: { template_id: id },
    });

    if (updatedRowsCount === 0) {
      return next(
        new CustomError(`Template with ID ${id} not found for update`, 404)
      );
    }

    const updatedTemplate = await Template.findByPk(id);
    res.status(200).json({
      success: true,
      message: "Template updated successfully.",
      data: updatedTemplate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update template.",
      error: error.message,
    });
  }
};

// Delete template
exports.deleteTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRowCount = await Template.destroy({
      where: { template_id: id },
    });

    if (deletedRowCount === 0) {
      return next(
        new CustomError(`Template with ID ${id} not found for deletion`, 404)
      );
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete template.",
      error: error.message,
    });
  }
};
