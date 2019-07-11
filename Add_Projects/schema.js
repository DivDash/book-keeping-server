const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Project = new Schema({
    name :  String,
    client : String,
    accountReceivable : Number,
    unearnedRevenue: Number,
    revenue: Number,
    creditedAmount: Number,
    debitedAmount: Number,
    date: Date, 
    status: String,
})

module.exports = mongoose.model('Project', Project);
