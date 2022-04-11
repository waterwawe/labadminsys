const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Measurement = db.model('Measurement', {
    time: Date,
    sample: Number,
    result: Number,
    Operator: String,
    _measuredProduct: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }
});

module.exports = Measurement;