const Review = require('../models/reviewModel');

exports.createReview = async (req, res) => {
    try{

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
        new: true, //it will return a updated document otherwise it will send aa old document
        runValidators: true, //if it is true then validartors in schema will be checked again
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