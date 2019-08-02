const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = Schema({
    email: String,
    name: String,
    password: String,
    role: String,
})

module.exports.User = mongoose.model('users', User)