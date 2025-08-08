const express = require('express');
const router = express.Router();
const logosController = require('../controllers/logos.controller');

// Read - GET all logos with pagination
router.get('/', logosController.getAllLogos);

// Create - POST a new logo
router.post('/', logosController.createLogo);

// Read - GET a single logo by its ID
router.get('/:id', logosController.getLogoById);

// Update - PATCH an existing logo
router.patch('/:id', logosController.updateLogo);

// Delete - DELETE a logo
router.delete('/:id', logosController.deleteLogo);

module.exports = router;
