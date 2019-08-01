const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const JournalEntry = new Schema({
    costCenterId: String,
    debitAccountId: String,
    creditAccountId: String,
    amount: Number,
    typeOfEntry: String,
    particulars: String,
    date: Date
})

module.exports = mongoose.model('JournalEntry', JournalEntry);
