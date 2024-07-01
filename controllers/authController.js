const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');

// register a user  => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "portrait-man-cartoon-style_23-2151133992.jpg",
      url: "C:\Users\pc\Downloads\portrait-man-cartoon-style_23-2151133992.jpg",
    },
  });

const token = user.getJwtToken();


 sendToken(user, 200, res)
});

// Login user => /a[i/v1/login]
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password} = req.body;

    //check if email and password is entered by user 
    if(!email || !password){
        return next(new ErrorHandler('Please enter email & password', 400));
    }


// finding user in database
    const user = await User.findOne({ email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    //checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password', 401))
    }

    sendToken(user, 200, res)
});

// Forgot Password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findOne({email: req.body.email});

  if(!user){
    return next (new ErrorHandler('User not found with this email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false});

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

  try {
    
    await sendEmail({
      email: user.email,
      subject: 'wecode Password Recovery',
      message,
    })

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`
    })
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false});

    return next(new ErrorHandler(error.message, 500))
  }
})

// reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

  //Hash URl token
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
resetPasswordToken,
resetPasswordExpire: {$gt: Date.now()}
  })

  if(!user){
    return next(new  ErrorHandler('Password reset token is invalid or has been expired', 400))
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler('Password does not match', 400))
  }

  // setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res)
})

// Get currenntly logged in user details =>  /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  })
})

// Update / change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
const user = await User.findById(req.user.id).select('+password');

// check previous user password
const isMatched = await user.comparePassword(req.body.oldPassword)
if(!isMatchedMatched){
  return next(new ErrorHandler('old password is incorrect', 400));
}

user.password = req.body.password;
await user.save();

sendToken(user, 200, res)
})

// Logout user  => /api/v1/logout
exports.logout = catchAsyncError(async(req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json ({
    success: true,
    message: "Logged out"
  })
})