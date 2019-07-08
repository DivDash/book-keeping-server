const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = Schema({
    email: String,
    username: String,
    password: String,
    date: Date,
    role: String,
})

module.exports.User = mongoose.model('users', User)