const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Please enter a service title'],
        maxlength: [100, 'Title must not have more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
        maxlength: [2000, 'Description must not have more than 2000 characters']
    },
    category: {
        type: String,
        required: [true, 'Please select a category'],
        enum: ['Home Cleaning', 'Plumbing', 'Electrical', 'Tutoring', 'Beauty & Wellness', 'Photography', 'Other']
    },
    rate: {
        type: Number,
        required: [true, 'Please enter a rate'],
        min: [0, 'Rate cannot be negative']
    },
    rateType: {
        type: String,
        enum: ['hourly', 'fixed'],
        default: 'hourly'
    },
    location: {
        type: String,
        required: [true, 'Please enter a location']
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('listing', listingSchema);
