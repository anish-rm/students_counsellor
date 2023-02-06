/* eslint-disable no-unused-vars */
const fs = require('fs');
const College = require('../models/collegeModel');

// we need to export here but we need to expost all these functions
// we now put all these function in export
// here we adding two.. becoz now our current directory is routes so we are telling go up one folder
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// ); //durname is the folder where currenbt script is located





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

// exports.getTour = async (req, res) => {
//   // :id is a variable
//   // we can have any number of variables like :id/:x/:y
//   // we have to specify otherwise error
//   // to make it optional :y?
//   // console.log(req.params);//params--> it will have all the variable that we declared
//   // nnow go to postman and run  /api/v1/tours/5  -->output {id:'5'}
//   // const id = req.params.id * 1;
//   // id is string we have to convert it to number. so when we multiply a string with 1 it will convert it to number
//   // const tour = tours.find((el) => el.id === id); //ut will create aaary where vthis comparison is true
//   // if we req tour that not exists we have to send fail
//   // if(!tour){
//   //     return res.status(404).json({ //return --> we want to exit the func right awat=y
//   //         status : 'fail',
//   //         message: 'Url not found'
//   //     })
//   // }
//   try {
//     const tour = await Tour.findById(req.params.id);
//     // Tour.findOne({_id : req.params.id})  It works same as above
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Could no able to fetch',
//     });
//   }
// };

exports.createCollege = async (req, res) => {
  try {
    // if it was rejected it will go to catch block
    const newCollege = await College.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        college: newCollege,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
// we no need to restrat so file will be read only once .
// because whenever the file is modified it automatically restarts te server so the top fileRead is done everytime when we restart the server.

// name1='The Snow Adventurer';
// const tour = tours.find(el => el.name === name1);
// console.log(tour);

// exports.updateTour = async (req, res) => {
//   // if(req.params.id > tours.length){
//   //     return res.status(404).json({ //return --> we want to exit the func right awat=y
//   //         status : 'fail',
//   //         message: 'Url not found'
//   //     });
//   // }
//   try {
//     // updating
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//       // options refer documentaion for more options and more methods
//       new: true, //it will return a updated document otherwise it will send aa old document
//       runValidators: true, //if it is true then validartors in schema will be checked again
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Could no able to update',
//     });
//   }
//   // console.log(req.body);
// };
exports.deleteCollege = async (req, res) => {
  try {
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