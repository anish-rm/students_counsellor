/* eslint-disable no-unused-vars */
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');
const slugify = require('slugify');

const College = require('../models/collegeModel');

const ClosingRank = require('../models/closingRankModel');

const Review = require('../models/reviewModel');


const multerStorage = multer.memoryStorage();


const multerFilter = (req, file, cb) => {
  // to check if uploaded file is image
  // we can also write code for csv file
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(res.status(400).json({
      status: 'fail',
      message: 'Not an image! Please upload only images.',
      }) , false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});


exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = async (req, res, next) => {
  try{
    if (!req.file) {
      return next();
    }
    const name = slugify(req.body.name, { lower: true });
    req.file.filename = `${name}.jpeg`;
    // why like this becoz first it is set by multer upload now we have deleted that so we need to set it like this then only our middleware can use it
    // eg we are accessing req.file.name in update user middleware but as we deleted that multer we need to set it like this
    // above we will set the extension based on user uplaoding now as we format all to jpg  we can that as extension
  
    // it is asynchronous function
    // it returns a promise they take some timme
    // they should not block event loop
    await sharp(req.file.buffer) //we can use like this becoz we are saving image bufferas memory in multer storage
      .resize(2000, 1333) // to crop it as square
      .toFormat('jpeg') // to convert it to jpeg
      .jpeg({ quality: 90 })
      .toFile(`public/img/colleges/${req.file.filename}`); //to save it into our file storage
    next();
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  
};

exports.getAllColleges = async (req, res) => {
  try {
    let query = College.find();
    if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
          } else {
            query = query.sort('-createdAt');
          }
      const colleges = await query;
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      simple: req.simple,
      requestedAt: req.requestTime,
      results: colleges.length, 
      data: {
        colleges, 
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Could no able to fetch',
    });
  }
};


exports.createCollege = async (req, res) => {
  try {
    
    console.log("😎😎😎😎",req.body);
    if (req.file) req.body.image = req.file.filename;
    const coursesAvailable = req.body.coursesAvailable.split(",");
    req.body.coursesAvailable = coursesAvailable;
    const newCollege = await College.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        college: newCollege,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCollege = async (req, res) => {
  try {
    await ClosingRank.deleteMany( { college: req.params.id });
    await Review.deleteMany( { college: req.params.id });
    await College.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Could no able to delete',
    });
  }
  // console.log(req.body);
};

exports.getCollegeRanks = async (req, res) => {
  try {
    let rank = req.params.rank * 1;
    rank = rank - 100;
    let query = College.find().populate({
      path: 'predictedDept',
      match: { $and: [{ category: `${req.params.category}` }, { rank:  { $gte: rank }  }] },
      select: 'department rank -college',
    });
    query = query.select('-coursesAvailable -createdAt -updatedAt -__v');
    query = query.sort('nirfRank');
    const college = await query.find( { "numPredictedDept": { $gt: 0 } } );
    const rescollege = college.filter( (el) => {
      return el.predictedDept.length > 0;
    });
    res.status(200).json({
      status: 'success',
      results: rescollege.length,
      data: {
        colleges: rescollege
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

exports.updateCollege = async (req, res) => {
  try{
    console.log(req.body);
    if (req.file) req.body.image = req.file.filename;
    const college = await College.findByIdAndUpdate(req.params.id,req.body, {
      new: true, //it will return a updated document otherwise it will send aa old document
      runValidators: true, //if it is true then validartors in schema will be checked again
    });
    res.status(203).json({
      status: 'success',
      data: {
        college
      },
    });
  } catch(err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}