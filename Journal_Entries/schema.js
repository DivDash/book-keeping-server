const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JournalEntry = new Schema({
    particulars :  String,
    project: String,
    // Not needed
    // currentBalance : Number,
    receivingAccount: String,
    sendingAccount: String,
    creditedAmount: Number,
    debitedAmount: Number,
    typeOfEntry: String,
    date: Date,
    // Not needed
    // status: String,
})

module.exports = mongoose.model('JournalEntry', JournalEntry);
