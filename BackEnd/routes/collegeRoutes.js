const express = require('express');
const collegeController = require('../controllers/collegeController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/collegeRanks/:category/:rank',collegeController.getCollegeRanks);

router
  .route('/')
  .get(collegeController.getAllColleges)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
     collegeController.uploadUserPhoto, 
     collegeController.resizeUserPhoto, 
     collegeController.createCollege);

router
  .route('/:id')
//   .get(tourController.getTour)
  .patch(authController.protect,
    collegeController.uploadUserPhoto, 
    collegeController.resizeUserPhoto,  
    authController.restrictTo('admin'),
    
    collegeController.updateCollege)
  .delete(authController.protect, authController.restrictTo('admin'), collegeController.deleteCollege);

module.exports = router;