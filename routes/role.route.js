const express = require("express");
const { createNewRoleHandler } = require("../controllers/role.controller");


const router = express.Router();

router.route("/").post(createNewRoleHandler);

module.exports =  router ;
