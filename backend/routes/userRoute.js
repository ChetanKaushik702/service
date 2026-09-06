const express = require('express');
const { registerUser, logInUser, logOutUser, getUserProfile, updateProfile, updatePassword, forgotPassword, resetPassword } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(logInUser);
router.route('/logout').get(isAuthenticatedUser, logOutUser);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me').put(isAuthenticatedUser, updateProfile);
router.route('/me/password').put(isAuthenticatedUser, updatePassword);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

module.exports = router;