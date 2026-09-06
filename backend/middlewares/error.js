const ErrorHandler = require('../utils/errorHandler');

const handler = (err, req, res, next) => {
    const isOperational = err instanceof ErrorHandler;

    // invalid mongo ObjectId (e.g. bad/stale id in URL)
    if (err.name === 'CastError') {
        err = new ErrorHandler('The requested item could not be found.', 404);
    }

    // duplicate key (e.g. email already registered)
    else if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || 'value';
        err = new ErrorHandler(`This ${field} is already in use.`, 400);
    }

    // mongoose schema validation
    else if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((e) => e.message).join(', ');
        err = new ErrorHandler(message, 400);
    }

    // bad/expired JWT
    else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        err = new ErrorHandler('Session expired. Please login again.', 401);
    }

    // anything else unclassified: never leak raw internals to the client
    else if (!isOperational) {
        console.error(err);
        err = new ErrorHandler('Something went wrong. Please try again.', err.statusCode || 500);
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    })
}

module.exports = handler;
