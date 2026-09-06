const Request = require('../models/requestModel');
const Listing = require('../models/listingModel');
const AsyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// create a request for a listing
const createRequest = AsyncErrorHandler(async (req, res, next) => {
    const { listingId, message } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
        return next(new ErrorHandler('Listing not found', 404));
    }

    if (listing.professional.toString() === req.user._id.toString()) {
        return next(new ErrorHandler('You cannot request your own listing', 400));
    }

    const request = await Request.create({
        listing: listing._id,
        professional: listing.professional,
        user: req.user._id,
        message,
    });

    res.status(201).json({
        success: true,
        request,
    });
});

// requests the current user has sent
const getSentRequests = AsyncErrorHandler(async (req, res, next) => {
    const requests = await Request.find({ user: req.user._id })
        .populate('listing', 'title')
        .populate('professional', 'name')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        requests,
    });
});

// requests a professional has received
const getReceivedRequests = AsyncErrorHandler(async (req, res, next) => {
    const requests = await Request.find({ professional: req.user._id })
        .populate('listing', 'title')
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        requests,
    });
});

// professional accepts/declines a request
const updateRequestStatus = AsyncErrorHandler(async (req, res, next) => {
    const request = await Request.findById(req.params.id);

    if (!request) {
        return next(new ErrorHandler('Request not found', 404));
    }

    if (request.professional.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler('You are not allowed to update this request', 403));
    }

    if (!['accepted', 'declined'].includes(req.body.status)) {
        return next(new ErrorHandler('Invalid status', 400));
    }

    request.status = req.body.status;
    await request.save();

    await request.populate('listing', 'title');
    await request.populate('user', 'name email');

    res.status(200).json({
        success: true,
        request,
    });
});

module.exports = {
    createRequest,
    getSentRequests,
    getReceivedRequests,
    updateRequestStatus,
}
