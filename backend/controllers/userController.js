const User = require('../models/userModel');
const AsyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require("cloudinary");
// register a new user
const registerUser = AsyncErrorHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    const role = req.body.role === 'professional' ? 'professional' : 'user';

    let avatar = undefined;
    if (req.body.avatar) {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar,
      role,
    });
    sendToken(user, 201, res);
});
  
// login user
const logInUser = AsyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password both', 400));
    }

    const user = await User.findOne({email}).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid email or password', 400));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 403));
    }
    sendToken(user, 200, res);
})

// get currently logged in user
const getUserProfile = AsyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user,
    });
});

// logout user
const logOutUser = AsyncErrorHandler(async (req, res, next) => {
    res.cookie('token', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(Date.now())
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
})

// forgot password
const forgotPassword = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return next(new ErrorHandler('User doesn\'t exist', 404));
    }

    // generating reset password token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const clientUrl = process.env.CLIENT_URL || `${req.protocol}://${req.get('host')}`;
    const resetPasswordUrl = `${clientUrl}/password/reset/${resetToken}`;

    const message = `Your password reset token is:\n\n${resetPasswordUrl}.\n\nIf you have not requested for this email, please ignore this.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'ServiceFare password recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `E-mail sent to ${user.email} successfully`
        });
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.expirePasswordToken = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(err.message, 500));
    }
})

// reset password
const resetPassword = AsyncErrorHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        expirePasswordToken: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler('Invalid/Expired reset password token', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password doesn\'t match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.expirePasswordToken = undefined;

    await user.save();

    sendToken(user, 200, res);
});

module.exports = {
    registerUser,
    logInUser,
    logOutUser,
    getUserProfile,
    forgotPassword,
    resetPassword
}