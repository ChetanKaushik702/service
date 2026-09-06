const Listing = require('../models/listingModel');
const AsyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require("cloudinary");

// browse/search listings (public)
const getListings = AsyncErrorHandler(async (req, res, next) => {
    const filter = { isActive: true };

    if (req.query.category) {
        filter.category = req.query.category;
    }
    if (req.query.location) {
        filter.location = { $regex: req.query.location, $options: 'i' };
    }
    if (req.query.minRate || req.query.maxRate) {
        filter.rate = {};
        if (req.query.minRate) filter.rate.$gte = Number(req.query.minRate);
        if (req.query.maxRate) filter.rate.$lte = Number(req.query.maxRate);
    }

    const page = Number(req.query.page) || 1;
    const limit = 12;

    const listings = await Listing.find(filter)
        .populate('professional', 'name')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    const total = await Listing.countDocuments(filter);

    res.status(200).json({
        success: true,
        listings,
        total,
        page,
        pages: Math.ceil(total / limit),
    });
});

// single listing detail (public)
const getListingDetail = AsyncErrorHandler(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id).populate('professional', 'name');

    if (!listing) {
        return next(new ErrorHandler('Listing not found', 404));
    }

    res.status(200).json({
        success: true,
        listing,
    });
});

// professional's own listings
const getMyListings = AsyncErrorHandler(async (req, res, next) => {
    const listings = await Listing.find({ professional: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        listings,
    });
});

// create a listing
const createListing = AsyncErrorHandler(async (req, res, next) => {
    const { title, description, category, rate, rateType, location } = req.body;

    let images = [];
    if (req.body.images && req.body.images.length) {
        for (const image of req.body.images) {
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "listings",
            });
            images.push({
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            });
        }
    }

    const listing = await Listing.create({
        title,
        description,
        category,
        rate,
        rateType,
        location,
        images,
        professional: req.user._id,
    });

    res.status(201).json({
        success: true,
        listing,
    });
});

// update a listing (owner only)
const updateListing = AsyncErrorHandler(async (req, res, next) => {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(new ErrorHandler('Listing not found', 404));
    }

    if (listing.professional.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler('You are not allowed to update this listing', 403));
    }

    const { title, description, category, rate, rateType, location, isActive } = req.body;

    listing = await Listing.findByIdAndUpdate(
        req.params.id,
        { title, description, category, rate, rateType, location, isActive },
        { new: true, runValidators: true }
    );

    res.status(200).json({
        success: true,
        listing,
    });
});

// delete a listing (owner only)
const deleteListing = AsyncErrorHandler(async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(new ErrorHandler('Listing not found', 404));
    }

    if (listing.professional.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler('You are not allowed to delete this listing', 403));
    }

    await listing.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Listing deleted successfully',
    });
});

module.exports = {
    getListings,
    getListingDetail,
    getMyListings,
    createListing,
    updateListing,
    deleteListing,
}
