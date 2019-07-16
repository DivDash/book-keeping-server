const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JournalEntry = new Schema({
    particulars: String,
    costCenterId: String,
    // Not needed
    // currentBalance : Number,
    receivingAccountId: String,
    sendingAccountId: String,
    transferredAmount: Number,
    // creditedAmount: Number,
    // debitedAmount: Number,
    typeOfEntry: String,
    date: Date,
    // Not needed
    // status: String,
})

module.exports = mongoose.model('JournalEntry', JournalEntry);
