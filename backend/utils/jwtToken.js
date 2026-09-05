const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now() + (Number(process.env.COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });
}

module.exports = sendToken;