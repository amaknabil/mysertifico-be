const db = require('../models');

// Controller function to get all templates
exports.getAllTemplates = async (req, res) => {
  try {
    // Call the findAll method on the Template model to retrieve all records.
    const templates = await db.Template.findAll();

    res.status(200).json({
      success: true,
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
    // Call the count method on the Template model to get the total number of records.
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
