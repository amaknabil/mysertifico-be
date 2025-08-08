
const db = require('../models');
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
          title: { [Op.like]: `%${name}%` }
        });
      }

      if (id) {
        // Add the condition for searching by template_id (exact match)
        searchConditions[Op.or].push({
          template_id: id
        });
      }
    }

    // Execute the database query with the search and pagination conditions
    const templates = await db.Template.findAll({
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
      message: 'Failed to retrieve templates.',
      error: error.message,
    });
  }
};
