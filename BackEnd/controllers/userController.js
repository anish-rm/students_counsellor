const User = require('../models/userModel');

exports.getMe = (req, res) => {
    res.status(200).json({
        status:'success',
        user: req.user,
    })
}