const reviews = require('../models/reviewModel');

// Get all reviews

exports.addReviewController = async(req,res)=>{
    console.log('inside reviewController');
    const {name,email,message,rating} = req.body;
    try{
        const newReview = new reviews({name,email,message,rating})
        await newReview.save()
        res.status(200).json({newReview})
    }catch(err){
        res.status(401).json(err)
    }
}