const testimonials = require('../models/testimonyModel')

//create testimony controller

exports.addTestimonyController = async(req,res)=>{
    console.log('inside testimonyController');

    const {name,email,message} = req.body
    try{
        const newTestimony = new testimonials({name,email,message})
        await newTestimony.save()
        res.status(200).json(newTestimony)
    }catch(err){
        res.status(401).json(err);
    }
}

//  get all testimonies controller
exports.getAllTestimoniesController = async(req,res)=>{
    console.log('inside getAllTestimoniesController');  
    try{
        const allTestimonies = await testimonials.find()
        res.status(200).json(allTestimonies)
    }catch(err){
        res.status(401).json(err)
    }       
}

// updateTestimonyController
exports.updateTestimonyController = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Using req.body is safer for PUT/PATCH
    try {
        const updatedTestimony = await testimonials.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true } // Returns the updated document
        );
        res.status(200).json(updatedTestimony);
    } catch (err) {
        res.status(401).json(err);
    }
}


exports.getApprovedTestimonies = async(req,res)=>{
    try{
        // Only fetch Approved testimonies for the public
        const approved = await testimonials.find({ status: 'Approved' })
        res.status(200).json(approved)
    }catch(err){
        res.status(401).json(err)
    }       
}