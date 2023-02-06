const express = require('express');
const closingRankController = require('../controllers/closingRankController');

const router = express.Router();

router.post('/',closingRankController.createClosingRank);


module.exports = router;