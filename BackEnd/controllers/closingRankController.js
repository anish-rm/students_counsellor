const ClosingRank = require('../models/closingRankModel');
const College = require('../models/collegeModel');

exports.createClosingRank = async(req, res) => {
    try {
        console.log("😎😎😎😎",req.body);
        const college = await College.findById(req.body.college);

        if(!college){
            return res.status(400).json({
                status: 'fail',
                message: 'No college found with that ID',
            });
        }

        const newRank = await ClosingRank.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: newRank
            }
        })
    } catch(err){
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong please try again later',
        });
    }
}