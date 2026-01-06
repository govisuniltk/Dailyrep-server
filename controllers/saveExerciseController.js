const saveExercises = require('../models/saveExerciseModel')

// save exercise controller
exports.addToSaveExerciseController = async (req, res) => {
    console.log('inside addToSaveExerciseController');
    const { id } = req.params;
    const userId = req.userId
    const { name, images } = req.body

    try {
        // Check if the exercise already exists for the user
        const existingExercise = await saveExercises.findOne({ exerciseId: id, userId })
        // If exercise does not exist, create a new entry
        if (existingExercise) {
            res.status(406).json({ message: "Exercise Already Saved" });
        } else {
            // add new exercise to saveExercises
            const newExercise = new saveExercises({
                exerciseId: id,
                exerciseName: name,
                exerciseImage: images,
                userId: userId
            })
            await newExercise.save()
            res.status(200).json(newExercise)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}

// user exercise get - authorization user
exports.getUserSavedExercisesController = async (req, res) => {
    console.log("inside getUserSavedExercisesController");
    // get userid
    const userId = req.userId
    try{
        const userExerciseCollection = await saveExercises.find({userId})
        res.status(200).json(userExerciseCollection)
    }catch(err){
        res.status(401).json(err)
    }
}

    // remove saved exercise controller - to be implemented authorization needed

    exports.removeSaveExerciseController = async (req, res) => {
        console.log("inside removeSavedExerciseController");
        const { id } = req.params;
        try{
            const removeSaveExercise = await saveExercises.findByIdAndDelete({_id:id})
            res.status(200).json(removeSaveExercise)
        } catch(err){
            res.status(401).json(err)
        }       
    }