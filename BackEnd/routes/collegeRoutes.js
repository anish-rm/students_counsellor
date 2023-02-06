const express = require('express');
const collegeController = require('../controllers/collegeController');

const router = express.Router();

router.get('/collegeRanks/:category/:rank',collegeController.getCollegeRanks);

router
  .route('/')
  .get(collegeController.getAllColleges)
  .post(collegeController.createCollege);

router
  .route('/:id')
//   .get(tourController.getTour)
  .patch(collegeController.updateCollege)
  .delete(collegeController.deleteCollege);

module.exports = router;