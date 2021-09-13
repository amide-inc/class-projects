const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema =  new Schema({
    name: {type:String},
    price:{type:Number},
    mrp: {type:Number},
    description: {type:String },
    thumbnail: {type:String},
    created_at: {type:Number, default: Date.now().valueOf()},
    updated_at: {type:Number, default: Date.now().valueOf()}
})

module.exports = mongoose.model('Product', productSchema);