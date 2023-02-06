const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.get('/getUserReviews', reviewController.getUserReviews);

router.route('/')
    .get(reviewController.getAllReviews)
    .post(reviewController.createReview);

router.route('/:id')
    .get(reviewController.getReview)
    .patch(reviewController.updateReview);

module.exports = router;