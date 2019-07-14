const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NonProfit = new Schema({
    name: String,
    expenses: Number,
    particulars: String
})

module.exports = mongoose.model('NonProfit', NonProfit);
