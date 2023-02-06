const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A college should have a name'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'A college must have a location'],
  },
  coursesAvailable:[String],
  naacAccrediation: {
    type: String,
    required: [true, 'A college must have a Accrediation'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  contact: {
    type: String,
    trim: true, 
    required: [true, 'A college must have a contact'],
  },
  image: {
    type: String, //only the name of the image then we can read from the file system
    required: [true, 'A college must have a image'],
  },
  placement: {
    type: String
  },
  hostelFacilities: {
    type: String
  },
  link: {
    type: String,
  },
  nirfRank: {
    type: Number
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true, //it will create updated at and created at field automatically
});

// ----------------------VIRTUAL POPULATE---------
// we want to access reviews on specific tour so we are creating virtual populate
collegeSchema.virtual('predictedDept', {
  ref: 'ClosingRank',
  foreignField: 'college', //foreign field is which field we want to referece in review model . That is tour field where we are referencing the parent tour
  localField: '_id', //local field - we are mentioning foreign field right so that reference where it is in our current model is _id becuase in forienkey we are storing just id in name of tour
});


// collegeSchema.pre(/^find/, function (next) {
//   // this.find({ secretTour: { $ne: true } }); //this--> currently executing query
//   console.log(this.predictedDept);
//   next();
// });

const College = mongoose.model('College', collegeSchema);

module.exports = College;