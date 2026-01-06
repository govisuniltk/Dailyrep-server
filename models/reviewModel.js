const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },

    status:{
        type:String,
        enum:['pending','approved','rejected'],
        default:'pending'
    }
})

const reviewModel = mongoose.model('Review',reviewSchema);

module.exports = reviewModel;