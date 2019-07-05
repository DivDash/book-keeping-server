const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CashAccount = new Schema({
    particulars :  String,
    currentBalance : Number,
})

module.exports = mongoose.model('CashAccount', CashAccount);
