const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    sendername : {type : 'string'},
    receivername : {type : 'string'},
    amount : {type : 'number'}
},{timestamps : true});

const History = mongoose.model('history',ProductSchema);

module.exports = History;