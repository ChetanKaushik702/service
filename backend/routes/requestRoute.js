const express = require('express');
const {
    createRequest,
    getSentRequests,
    getReceivedRequests,
    updateRequestStatus,
} = require('../controllers/requestController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.route('/requests').post(isAuthenticatedUser, createRequest);
router.route('/requests/me/sent').get(isAuthenticatedUser, getSentRequests);
router.route('/requests/me/received').get(isAuthenticatedUser, authorizeRoles('professional'), getReceivedRequests);
router.route('/requests/:id').put(isAuthenticatedUser, authorizeRoles('professional'), updateRequestStatus);

module.exports = router;
