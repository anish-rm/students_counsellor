const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true, 
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: {
      type: String,
      default: 'default.jpg', 
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This works only on save and create so whenever update the password we nedd to save it
        validator: function (el) {
          return el === this.password; //we return either true or false in validation
        },
        message: 'Passwords are not same',
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  });

userSchema.pre('save', async function (next) {
    //we only want to encrypt when password is created or updated
    if (!this.isModified('password')) return next();
  
    this.password = await bcrypt.hash(this.password, 12);
  
    // DELETE PASSWORDCONFIRM FIELD
    this.passwordConfirm = undefined;
    next();
  });

userSchema.pre('save', function (next) {
    // we only need to have changedPassword at field only when user updated
    // we should not want this when created newso use this.isNew
    if (!this.isModified('password') || this.isNew) return next();
  
    // some problem may occur that saving to database may be bit slow but before that token may be issued
    // to fix this just store 6 sec  before
    // becoz the pwd changed must be lesser than time when jwt issued
    this.passwordChangedAt = Date.now() - 60000;
    next();
});

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = async function (JWTTimestamp) {
    if (this.passwordChangedAt) {
      // to convert the date to milliseconds
    //   console.log(this.passwordChangedAt);
      const changed = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    //   console.log(changed, JWTTimestamp);
      // console.log(JWTTimestamp < changed);
      return JWTTimestamp < changed; // we will return false if pasword changfed before jwt issued or true
    }
  
    return false; //defaulty we will return false means the user has not changed pwd after token was issued
};

userSchema.methods.changedPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    // we should not store this token as it in db
    // we can encrypt and store it
    // we no need to use bcrypt like hash because this have low attack vector
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    
    // we want to passwordrest to expire after 10min
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };

const User = mongoose.model('User', userSchema);

module.exports = User;