const db = require('../models');

// Controller function to get all templates with pagination
exports.getAllTemplates = async (req, res) => {
  try {
    // Get page and limit from query parameters, with default values
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12; // Use a default limit of 12
    const offset = (page - 1) * limit;

    // Use Sequelize's findAll method with limit and offset for pagination
    // include: [{ model: db.User }], // Example of including a related model
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
