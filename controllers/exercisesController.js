const exercises = require('../models/exercisesModel');

// Get all exercises
exports.getAllExercisesController = async(req,res)=>{
    console.log('inside getAllExercisesController');
    try{
        const allExercises = await exercises.find()
        res.status(200).json(allExercises)
    }catch(err){
        res.status(401).json(err)
    }
}

// getExerciseController - need authorization

    exports.getAExerciseController = async(req,res)=>{
        console.log('inside getARecipeController');
        // we want to get a dynamic value from the url
        const {id} = req.params
        try{
            const exerciseDetails = await exercises.findById({_id:id})
            res.status(200).json(exerciseDetails)
        }catch(err){
            res.status(401).json(err)
        }
        
    } 

    // add exercise controller

    exports.addExerciseController = async (req, res) => {
    console.log("inside addExerciseController");
    
    // 1. Ensure 'id' is extracted from req.body
    const { name, force, level, mechanic, equipment, primaryMuscles, secondaryMuscles, instructions, category, images, id } = req.body;

    try {
        const existingExercise = await exercises.findOne({ name });
        if (existingExercise) {
            res.status(406).json({ message: "Exercise already exists" });
        } else {
            // 2. Pass the 'id' to the new model instance
            const newExercise = new exercises({
                name, force, level, mechanic, equipment, primaryMuscles, secondaryMuscles, instructions, category, images, id
            });
            await newExercise.save();
            res.status(200).json(newExercise);
        }
    } catch (err) {
        console.log("Error details:", err);
        res.status(401).json(err);
    }
}

// editExerciseController - update existing exercise
exports.editExerciseController = async (req, res) => {
    console.log("inside editExerciseController");
    
    // Get the dynamic ID from the URL params
    const { id } = req.params; 
    
    // Extract data from the request body
    const { name, force, level, mechanic, equipment, primaryMuscles, secondaryMuscles, instructions, category, images } = req.body;

    try {
        // findByIdAndUpdate takes the ID, the new data, and {new:true} to return the updated document
        const updatedExercise = await exercises.findByIdAndUpdate(
            { _id: id }, 
            {
                name, force, level, mechanic, equipment, 
                primaryMuscles, secondaryMuscles, instructions, 
                category, images
            }, 
            { new: true }
        );

        if (updatedExercise) {
            res.status(200).json(updatedExercise);
        } else {
            res.status(404).json("Exercise not found");
        }
    } catch (err) {
        console.log("Update Error:", err);
        res.status(401).json(err);
    }
};

 exports.deleteExerciseController = async (req, res) => {
    console.log("inside deleteExerciseController");
    const { id } = req.params;
    try {
        const deletedExercise = await exercises.findByIdAndDelete({ _id: id });
        if (deletedExercise) {
            res.status(200).json(deletedExercise);
        } else {
            res.status(404).json("Exercise not found");
        }
    } catch (err) {
        console.log("Delete Error:", err);
        res.status(401).json(err);
    }
};