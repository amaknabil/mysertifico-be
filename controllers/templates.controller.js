
const db = require('../models');
const CustomError = require('../utils/customError');

// Controller function to get all templates with pagination
exports.getAllTemplates = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const offset = (page - 1) * limit;

    const templates = await db.Template.findAll({
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
      message: 'Failed to retrieve templates.',
      error: error.message,
    });
  }
};

// Controller function to get the count of all templates
exports.countAllTemplates = async (req, res) => {
  try {
    const totalCount = await db.Template.count();

    res.status(200).json({
      success: true,
      total: totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to count templates.',
      error: error.message,
    });
  }
};



// Controller function to create a new template
exports.createTemplate = async (req, res, next) => {
  try {
    const newTemplate = await db.Template.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Template created successfully.',
      data: newTemplate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create new template.',
      error: error.message,
    });
  }
};

// Controller function to get a single template by ID
exports.getTemplateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const template = await db.Template.findByPk(id);

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
      message: 'Failed to retrieve template.',
      error: error.message,
    });
  }
};

// Controller function to update an existing template
exports.updateTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updatedRowsCount] = await db.Template.update(req.body, {
      where: { template_id: id },
    });

    if (updatedRowsCount === 0) {
      return next(new CustomError(`Template with ID ${id} not found for update`, 404));
    }

    // Since MySQL doesn't have the 'returning' option,
    // we need to fetch the updated record to send it in the response.
    const updatedTemplate = await db.Template.findByPk(id);

    res.status(200).json({
      success: true,
      message: 'Template updated successfully.',
      data: updatedTemplate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update template.',
      error: error.message,
    });
  }
};

// Controller function to delete a template
exports.deleteTemplate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedRowCount = await db.Template.destroy({
      where: { template_id: id },
    });

    if (deletedRowCount === 0) {
      return next(new CustomError(`Template with ID ${id} not found for deletion`, 404));
    }

    // A 204 No Content status code is standard for a successful deletion.
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete template.',
      error: error.message,
    });
  }
};
