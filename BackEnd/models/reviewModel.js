const mongoose = require('mongoose');
const College = require('./collegeModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 4,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a User'],
    },
    college: {
      type: mongoose.Schema.ObjectId,
      ref: 'College',
    },
  },
  {
    //this is for virtual properties not stored in database but  when we query it comes
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


reviewSchema.index({ college: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

// -------------------------CALCULATING REVIEW----------------------

// --------------------------STATIC  METHOD--------------------------
// this --> current model. We need to call aggreagate on the model so this.aggregate
reviewSchema.statics.calcAverageRatings = async function (collegeId) {
  const stats = await this.aggregate([
    {
      $match: { college: collegeId }, //it picks all tour that matches collegeId
    },
    {
      $group: {
        _id: '$college', //it is the common field that all documents have that we want to groupby
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  // console.log(stats[0].nRating);

  // to save them in thee tour collection
  // if -> when we deleted last review of specific tour then after executing that there will be nor review on database ont that collegeId
  // so our stats will be empty in that case we want to set it to default
  if (stats.length > 0) {
    await College.findByIdAndUpdate(collegeId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await College.findByIdAndUpdate(collegeId, {
      ratingsQuantity: 0,
      ratingsAverage: 4,
    });
  }
};

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.college);
});

// -------------------CALCULATING REVIEW WHEN UPDATED AND DELETED------------------

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne().clone();
  console.log(this.r);
  next();
});


reviewSchema.post(/^findOneAnd/, function () {
    console.log("iam here");

    this.r.constructor.calcAverageRatings(this.r.college); 
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
