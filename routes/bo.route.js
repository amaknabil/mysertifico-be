const express = require('express');
const {authMiddleware,protectAndCheckRoleMiddleware} = require('../middleware/auth.middleware');
const { updateBOHandler, addBoUserHandler, getAllBOUsersHandler, searchBOUsersHandler, updateBOUserStatusHandler, getBODashboardSummary } = require('../controllers/bo.controller');

const router = express.Router();


router.route('/me').patch(authMiddleware,updateBOHandler);
router.route('/bo-users').post(addBoUserHandler).get(getAllBOUsersHandler);

//use q=value as query
router.route('/bo-users/search').get(searchBOUsersHandler);
router.route('/bo-user/:user_id/status').patch(updateBOUserStatusHandler);
router.route('/summary').get(getBODashboardSummary)



module.exports = router 