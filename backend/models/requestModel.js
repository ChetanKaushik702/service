const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'listing',
        required: true
    },
    professional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    message: {
        type: String,
        required: [true, 'Please describe what you need'],
        maxlength: [1000, 'Message must not have more than 1000 characters']
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('request', requestSchema);
