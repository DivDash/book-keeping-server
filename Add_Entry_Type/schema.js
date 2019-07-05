const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EntryType = new Schema({
    entryTpe :  String,
    visible: Boolean,
})

module.exports = mongoose.model('EntryType', EntryType);
