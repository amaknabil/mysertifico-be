const express = require('express');
const router = express.Router();
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const contactUsRouter = require('./contactUs.route');
const {authMiddleware} = require('../middleware/auth.middleware');
const appRouter = require('./app.route');
const roleRouter = require('./role.route');
const organizationRouter = require('./orgRoutes');

router.use('/auth', authRouter);
router.use('/users',authMiddleware, userRouter);
router.use('/contact-us',contactUsRouter);
router.use('/apps',appRouter);
router.use('/roles', roleRouter);
router.use('/organizations', organizationRouter);

module.exports = router 