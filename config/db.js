const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gt5g7d', { useNewUrlParser: true });

module.exports = mongoose;