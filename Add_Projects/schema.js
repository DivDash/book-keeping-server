const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Project = new Schema({
    name :  String,
    client : String,
    accountReceivable : Number,
    unearnedRevenue: String,
    revenue: String,
    creditedAmount: Number,
    debitedAmount: Number,
    date: Date, 
    status: String,
})

module.exports = mongoose.model('Project', Project);
