const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name : {type : 'string' , required : true},
    email : {type : 'string' , required : true},
    curr_bal : {type : 'number' , required : true}
},{timestamps : true});

const Product = mongoose.model('product',ProductSchema);

module.exports = Product;