const express = require('express');
const {
    getListings,
    getListingDetail,
    getMyListings,
    createListing,
    updateListing,
    deleteListing,
} = require('../controllers/listingController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const router = express.Router();

router.route('/listings').get(getListings);
router.route('/listings/me/mine').get(isAuthenticatedUser, authorizeRoles('professional'), getMyListings);
router.route('/listings').post(isAuthenticatedUser, authorizeRoles('professional'), createListing);
router.route('/listings/:id').get(getListingDetail);
router.route('/listings/:id').put(isAuthenticatedUser, authorizeRoles('professional'), updateListing);
router.route('/listings/:id').delete(isAuthenticatedUser, authorizeRoles('professional'), deleteListing);

module.exports = router;
