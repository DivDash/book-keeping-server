const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JournalEntry = new Schema({
    particulars :  String,
    project: String,
    // Not needed
    // currentBalance : Number,
    // Testing wajeeh
    contractor: String,
    paymentMethod: String,
    creditedAmount: Number,
    debitedAmount: Number,
    typeOfEntry: String,
    date: Date, 
    status: String,
})

module.exports = mongoose.model('JournalEntry', JournalEntry);
