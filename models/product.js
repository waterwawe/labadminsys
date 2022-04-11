const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Product = db.model('Product', {
    name: String,
    minValidResult: Number,
    maxValidResult: Number
});

module.exports = Product;