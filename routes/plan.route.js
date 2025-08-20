const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { createPlanHandler, getPlansHandler, updatePlanHandler, deletePlanHandler, updatePlanStatusHandler } = require('../controllers/plan.controller');
const router = express.Router();


// router.route('/:a').get(getMySertificoPlansHandler);
router.route('/:app_name').post(createPlanHandler).get(getPlansHandler);
router.route('/:plan_id').patch(updatePlanHandler).delete(deletePlanHandler);
router.route('/:plan_id/status').patch(updatePlanStatusHandler);



module.exports = router 