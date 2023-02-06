const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signUp = async (req, res, next) => {
    try{
        console.log(req.body);
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            passwordChangedAt: req.body.passwordChangedAt
          });
         const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ), //after th data we mentioned the client will delete it
            // secure: true, //by setting this cookie will only be sent over encryped connection
            httpOnly: true, //cookie cannnot be accessed or modified in any way by the browser
          };
          // first para - name, second - data, third - options
          res.cookie('jwt', token, cookieOptions);
        
          newUser.password = undefined;
          res.status(201).json({
            status: 'success',
            token,
            data: {
              newUser,
            },
          });
        
    } catch (err){
        res.status(400).json({
            status: 'error',
            message: err,
        });
    }
}

exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: "Please Provide email and password",
            });
        }

        // here +password because we mentiooned as select false

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'error',
                message: "'Incorrect password or email",
            });
        }
        console.log(user);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ), 
            httpOnly: true, 
          };
          res.cookie('jwt', token, cookieOptions);
        
          res.status(200).json({
            status: 'success',
            token,
            data: {
              user,
            },
          });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'error',
            message: err,
        });
    }
    
}

exports.protect = async (req, res, next) => {

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } 
    
    // console.log("😍😍",token);

    if(!token) {
      console.log("no token")
      return res.status(401).json({
        message: 'You are not logged in! Please log in to get access',
    });
    }

    // verify
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
  const currentUser = await User.findById(decoded.id);
  if(!currentUser) {
    return res.status(401).json({
      message: 'The token belonging to this user no longer exists',
    });
  }

  // CHECK IF USER CHANGED PWD AFTER THE TOKEN ISSUED
  if (await currentUser.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      message: 'User recently changed password Please log in again!',
    });
  }

  req.user = currentUser;

  next();
};


// AUTHORIZATION

exports.restrictTo =
  (...roles) =>
  // roles - it is array in deletetour case the roles allowed are = ['admin','lead-guide']
  (req, res, next) => {
    // roles will be available to this middleware becoz of closure
    // req.user we are assigned in protect middleware it will have detail of user logged in becoz we are running first protect middleware then only authorization middleware
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };

exports.updatePassword = async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id).select('+password');
    console.log(user);
    if(!req.body.currentPassword || !req.body.password || !req.body.passwordConfirm){
      return res.status(400).json({
        message: 'Please enter all the fields',
      });
    }
  // STEP 2: CHECK IF PASSWORD IS CORRECT
    if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
      return res.status(401).json({
        message: 'Your current password is wrong',
      });
    }

  // STEP 3: IF SO UPDATE PASSWORD
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ), 
        httpOnly: true, 
      };
    res.cookie('jwt', token, cookieOptions);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'error',
      message: err,
    });
  }
  
};