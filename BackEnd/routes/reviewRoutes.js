const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');


const router = express.Router();

router.get('/getUserReviews', reviewController.getUserReviews);

router.route('/')
    .get(reviewController.getAllReviews)
    .post(authController.protect, reviewController.createReview);

router.route('/:id')
    .get(reviewController.getReview)
    .patch(authController.protect, reviewController.updateReview);

module.exports = router;