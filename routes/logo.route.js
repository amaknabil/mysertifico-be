const express = require('express');
const router = express.Router();
const logosController = require('../controllers/logo.controller');


router.get('/', logosController.getAllLogos);


router.post('/', logosController.createLogo);


router.get('/search', logosController.getLogoByName);


router.get('/:id', logosController.getLogoById);


router.patch('/:id', logosController.updateLogo);


router.delete('/:id', logosController.deleteLogo);

module.exports = router;
