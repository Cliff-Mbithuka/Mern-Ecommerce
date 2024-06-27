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
  res.status(201).json({
    success: true,
    user,
  });
});
