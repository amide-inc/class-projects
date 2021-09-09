const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name : {type:String},
    about: {type:String},
    date: {type:Number},
    created_at: {type:Number, default: Date.now().valueOf()},
    updated_at: {type:Number, default: Date.now().valueOf()}
})

module.exports  = mongoose.model('Todo', todoSchema);