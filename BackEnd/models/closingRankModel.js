const mongoose = require('mongoose');

const closingRankSchema = new mongoose.Schema({

    college: {
        type: mongoose.Schema.ObjectId,
        ref: 'College',
        required: [true, 'Rank must belong to a college'],
    },
    category: {
        type: String,
        enum: ['OC','BC','SC','ST','BCM','MBC','SCA'],
        required: [true, 'A rank must belong to category'],
    },
    department: {
        type: String,
        required: [true, 'A rank must belong to department'],
    },
    rank: {
        type: Number,
        required: [true, 'Please enter the rank'],
    }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
});

const ClosingRank = mongoose.model('ClosingRank', closingRankSchema);

module.exports = ClosingRank;