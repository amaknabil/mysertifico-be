const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const contactUsRouter = require('./contactUs.route');
const authMiddleware = require('../middleware/auth.middleware');

router.use('/auth', authRouter);
router.use('/user',authMiddleware, userRouter);
router.use('/contact-us',contactUsRouter);

module.exports = router 