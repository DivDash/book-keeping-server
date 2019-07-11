const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BankAccount = new Schema({
    bankName :  String,
    accountHolder: String,
    currentBalance : Number,
}, {
    versionKey: false
})

module.exports = mongoose.model('BankAccount', BankAccount);
