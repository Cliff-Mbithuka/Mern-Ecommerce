const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

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


  res.status(201).json({
    success: true,
    token
  });
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

    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token
      });
});