const asyncHandler = require("express-async-handler");
const { Plan, App, Sequelize } = require("../models");
const CustomError = require("../utils/customError");
const { Op } = Sequelize;

// --- Helper Function to find a plan ---
const findPlanById = async (plan_id) => {
  const plan = await Plan.findByPk(plan_id);
  if (!plan) {
    throw new CustomError(`Plan with ID '${plan_id}' not found`, 404);
  }
  return plan;
};


/**
 * @desc    Get all plans for a specific application with pagination and search
 * @route   GET /api/v1/plans/app/:app_name
 * @access  Public
 */
const getPlansHandler = asyncHandler(async (req, res) => {
  const { app_name } = req.params;
  const { page = 1, limit = 10, search } = req.query;

  const app = await App.findOne({ where: { app_name } });
  if (!app) {
    throw new CustomError(`App with name '${app_name}' not found`, 404);
  }

  const whereClause = { app_id: app.app_id };
  if (search) {
    whereClause.plan_name = { [Op.like]: `%${search}%` };
  }

  const offset = (page - 1) * limit;

  const { count, rows: plans } = await Plan.findAndCountAll({
    where: whereClause,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [['createdAt', 'DESC']]
  });

  res.status(200).json({
    message: "Plans retrieved successfully",
    data: plans,
    pagination: {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      itemsPerPage: parseInt(limit),
    },
  });
});

/**
 * @desc    Create a new plan for a specific application
 * @route   POST /api/v1/plans/app/:app_name
 * @access  Private/Admin
 */
const createPlanHandler = asyncHandler(async (req, res) => {
  const { app_name } = req.params;
  const { plan_name, price, subscription, token_allocation, country } = req.body;

  if (!plan_name || price === undefined || subscription === undefined || !token_allocation || !country) {
    throw new CustomError("Please provide all required fields: plan_name, price, subscription, token_allocation, and country.", 400);
  }

  const app = await App.findOne({ where: { app_name } });
  if (!app) {
    throw new CustomError(`App with name '${app_name}' not found`, 404);
  }

  const newPlan = await Plan.create({
    app_id: app.app_id,
    plan_name,
    price,
    subscription,
    token_allocation,
    country,
  });

  res.status(201).json({
    message: "Plan created successfully",
    data: newPlan,
  });
});

/**
 * @desc    Update a plan by its ID
 * @route   PUT /api/v1/plans/:plan_id
 * @access  Private/Admin
 */
const updatePlanHandler = asyncHandler(async (req, res) => {
    const { plan_id } = req.params;
    const plan = await findPlanById(plan_id);

    // Update the plan with new data from the request body
    const updatedPlan = await plan.update(req.body);

    res.status(200).json({
        message: "Plan updated successfully",
        data: updatedPlan
    });
});

/**
 * @desc    Delete a plan by its ID
 * @route   DELETE /api/v1/plans/:plan_id
 * @access  Private/Admin
 */
const deletePlanHandler = asyncHandler(async (req, res) => {
    const { plan_id } = req.params;
    const plan = await findPlanById(plan_id);

    await plan.destroy();

    res.status(200).json({
        message: "Plan deleted successfully"
    });
});

/**
 * @desc    Update the status of a plan (e.g., 'active', 'inactive')
 * @route   PATCH /api/v1/plans/:plan_id/status
 * @access  Private/Admin
 */
const updatePlanStatusHandler = asyncHandler(async (req, res) => {
    const { plan_id } = req.params;


    const plan = await findPlanById(plan_id);
    plan.status = !plan.status;
    await plan.save();

    res.status(200).json({
        message: `Plan status updated to '${plan.status}'`,
        data: plan
    });
});


module.exports = {
  getPlansHandler,
  createPlanHandler,
  updatePlanHandler,
  deletePlanHandler,
  updatePlanStatusHandler
};
