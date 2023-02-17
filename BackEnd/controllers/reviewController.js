const Review = require('../models/reviewModel');
const mongoose = require('mongoose');

exports.createReview = async (req, res) => {
    try{
        console.log(req.body);
        req.body.user = req.user._id;
        if(!req.body.review){
            return res.status(404).json({
                status: 'fail',
                message: 'Please enter a review',
            });
        }
        const review = await Review.create(req.body);
        res.status(201).json({
            status:'success',
            data: {
                review
            }
        })
    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
}

exports.getAllReviews = async (req, res) => {
    try{    
        const reviews = await Review.find();

        res.status(200).json({
            status: 'success',
            data: {
                reviews,
            }
        })

    } catch (err){
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
}

exports.getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({
                status: 'fail',
                message: 'That ID is not found',
            });
        }

        res.status(200).json({
        status: 'success',
        data: {
            review,
        },
        });
    } catch(err){
        res.status(404).json({
            status: 'fail',
            message: 'Could no able to fetch',
        });
    }
}

exports.getCollegeReviews = async (req, res) => {
    try{
        const reviews = await Review.find({college: req.params.collegeid});
        if(!reviews){
            return res.status(404).json({
                status: 'fail',
                message: 'No college found with that ID',
            });
        }
        const collegeid = req.params.collegeid;
        const ObjectId = mongoose.Types.ObjectId;
        const stats = await Review.aggregate([
            {
              $match: { college: ObjectId(collegeid)}, //it is just a preliminary it will fetch documents above ratings average 4.5
            },
            {
              $group: {
                _id: req.params.collegeid, 
                numReviews: { $sum: 1 }, //whenever it go through a document one will be added to the numTour
                totRating: { $sum: '$rating' },
                avgRating: { $avg: '$rating' },
              },
            },
          ]);
        res.status(200).json({
            status:'success',
            stats,
            data: {
                reviews
            }
        })
        
    } catch (err){
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
}

exports.getUserReviews = async (req, res) => {
    try{

        const reviews = await Review.find({"Review": null});
        const stats = await Review.aggregate([
            {
              $match: { Review: null }, //it is just a preliminary it will fetch documents above ratings average 4.5
            },
            {
              $group: {
                _id: null, 
                numReviews: { $sum: 1 }, //whenever it go through a document one will be added to the numTour
                totRating: { $sum: '$rating' },
                avgRating: { $avg: '$rating' },
              },
            },
          ]);
        res.status(200).json({
            status:'success',
            stats,
            data: {
                reviews
            }
        })
    } catch(err) {
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
}

exports.updateReview = async (req, res) => {
    try{
      const review = await Review.findByIdAndUpdate(req.params.id,req.body, {
        new: true, 
        runValidators: true, 
      });
      console.log("hiiiii");
      res.status(203).json({
        status: 'success',
        data: {
          review
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

exports.deleteReview = async (req, res) => {
    try{
        const review = await Review.findById(req.params.id);
        const requserId = req.user._id.toString();
        const userid = review.user._id.toString();
        console.log(req.user._id, review.user._id);
        if(requserId != userid ){
            return res.status(403).json({
                status: 'fail',
                message: 'You cannot delete other reviews',
            });
        }

        await Review.findByIdAndDelete(req.params.id);

        if (!review) {
          return res.status(404).json({
            status: 'fail',
            message: 'No document found with that ID',
        });
        }
        
    
        res.status(204).json({
          status: 'success',
          data: null,
        });
    } catch(err){
        console.log(err);
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
   
}