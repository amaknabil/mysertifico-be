const express = require('express');
const router = express.Router();
const replyController = require('../controllers/reply.controller');
const { authMiddleware } = require('../middleware/auth.middleware');


router.patch('/:id/reply', authMiddleware, replyController.sendReply);

module.exports = router;
