// [CHANGE] Corrected import to directly use the Template model
const { Template } = require("../models");
const CustomError = require("../utils/customError");
const { Op } = require("sequelize");

// Controller function to get all templates with pagination and search
exports.getAllTemplates = async (req, res) => {
  try {
    // Get pagination parameters from the request query, with defaults
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const offset = (page - 1) * limit;

    // Build a dynamic search condition object
    const searchConditions = {};
    const { name, id } = req.query;

    // Check if either 'name' or 'id' is present in the query
    if (name || id) {
      // Use Op.or to combine the search conditions
      searchConditions[Op.or] = [];

      if (name) {
        // Add the condition for searching by title (partial match)
        searchConditions[Op.or].push({
          title: { [Op.like]: `%${name}%` },
        });
      }

      if (id) {
        // Add the condition for searching by template_id (exact match)
        searchConditions[Op.or].push({
          template_id: id,
        });
      }
    }

    // [CHANGE] Using the imported Template model directly
    const templates = await Template.findAll({
      where: searchConditions,
      limit: limit,
      offset: offset,
    });
    res.status(200).json({
      success: true,
      page: page,
      limit: limit,
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

// Controller function to get the count of all templates
exports.countAllTemplates = async (req, res) => {
  try {
    // Call the count method on the Template model to get the total number of records.
    // [CHANGE] Using the imported Template model directly
    const totalCount = await Template.count();

    res.status(200).json({
      success: true,
      total: totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to count templates.",
      error: error.message,
    });
  }
};

//Controller function to create a new template
exports.createTemplate = async (req, res, next) => {
  try {
    // [CHANGE] Using the imported Template model directly
    const newTemplate = await Template.create(req.body);

    res.status(201).json({
      success: true,
      message: "Template created successfully.",
      data: newTemplate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create new template.",
      error: error.message,
    });
  }
};

// Controller function to get a single template by ID
exports.getTemplateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // [CHANGE] Using the imported Template model directly
    const template = await Template.findByPk(id);

    if (!template) {
      return next(new CustomError(`Template with ID ${id} not found`, 404));
    }

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve template.",
      error: error.message,
    });
  }
};

// Controller function to update an existing template
exports.updateTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    // [CHANGE] Using the imported Template model directly
    const [updatedRowsCount] = await Template.update(req.body, {
      where: { template_id: id },
    });

    if (updatedRowsCount === 0) {
      return next(
        new CustomError(`Template with ID ${id} not found for update`, 404)
      );
    }

    // Since MySQL doesn't have the 'returning' option,
    // we need to fetch the updated record to send it in the response.
    // [CHANGE] Using the imported Template model directly
    const updatedTemplate = await Template.findByPk(id);

    res.status(200).json({
      success: true,
      message: "Template updated successfully.",
      data: updatedTemplate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update template.",
      error: error.message,
    });
  }
};

// Controller function to delete a template
exports.deleteTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    // [CHANGE] Using the imported Template model directly
    const deletedRowCount = await Template.destroy({
      where: { template_id: id },
    });

    if (deletedRowCount === 0) {
      return next(
        new CustomError(`Template with ID ${id} not found for deletion`, 404)
      );
    }

    // A 204 No Content status code is standard for a successful deletion.
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete template.",
      error: error.message,
    });
  }
};