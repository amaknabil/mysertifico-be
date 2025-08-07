// routes/orgRoutes.js
const express = require("express");
const { getAllOrganizationsHandler } = require("../controllers/org.controller");

const router = express.Router();

// GET /api/org
router.route("/org").get(getAllOrganizationsHandler);

module.exports = router;
