const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Project = new Schema({
    name: String,
    clientAccountId: String,
    accountReceivable: Number,
    unearnedRevenue: Number,
    revenue: Number,
    expenses: Number,
    // creditedAmount: Number,
    // debitedAmount: Number, Not needed
    date: Date, 
    status: String,
})

module.exports = mongoose.model('Project', Project);
