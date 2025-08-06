
const express = require('express');
const protect = require('../middleware/auth.middleware');
const { signUpHandler, loginHandler, logoutHandeler, forgotPasswordHandler, resetPasswordHandler, verifyEmailHandler, changePasswordHandler } = require('../controllers/auth.controller');
const router = express.Router();


router.route('/signup').post(signUpHandler);
router.route('/login').post(loginHandler);
router.route('/forgot-password').post(forgotPasswordHandler);
router.route('/reset-password/:id/:token').post(resetPasswordHandler);
router.route('/verify').get(verifyEmailHandler);

router.route('/logout').post(protect.authMiddleware,logoutHandeler);
router.route('/change-password').post(protect.authMiddleware,changePasswordHandler);


module.exports = router