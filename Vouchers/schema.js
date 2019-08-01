const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Voucher = new Schema({
    number: String,
    journalEntryIds: [String]
})

module.exports = mongoose.model('Voucher', Voucher);
