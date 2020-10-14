const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        min: 5,
        max: 500
    },
    email : {
        type : String,
        required: true,
        min: 5,
        max: 500
    },
    password : {
        type : String,
        required: true,
        min: 6,
        max: 1000
    },
    date : {
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model('User',schema);