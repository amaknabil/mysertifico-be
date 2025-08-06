const express = require("express");
const { createNewAppHandler } = require("../controllers/app.controller");

const router = express.Router();

router.route("/").post(createNewAppHandler);

module.exports =  router ;
