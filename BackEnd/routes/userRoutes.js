// const { Router } = require('express');
const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup',authController.signUp);
router.post('/login',authController.login);

router.patch('/updateMe', authController.protect, userController.uploadUserPhoto, userController.resizeUserPhoto, userController.updateMe);

router.patch('/updatePassword',authController.protect,authController.updatePassword);

router.get('/me',authController.protect ,userController.getMe);

module.exports = router;