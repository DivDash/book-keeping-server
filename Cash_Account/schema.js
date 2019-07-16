const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CashAccount = new Schema({
    accountHolder: String,
    currentBalance : Number,
    particulars :  String
})

module.exports = mongoose.model('CashAccount', CashAccount);
