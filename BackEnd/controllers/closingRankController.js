const ClosingRank = require('../models/closingRankModel');

exports.createClosingRank = async(req, res) => {
    try {
        const newRank = await ClosingRank.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: newRank
            }
        })
    } catch(err){
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
}