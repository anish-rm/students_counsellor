const express = require('express');
const closingRankController = require('../controllers/closingRankController');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/',authController.protect, authController.restrictTo('admin'),closingRankController.createClosingRank);


module.exports = router;