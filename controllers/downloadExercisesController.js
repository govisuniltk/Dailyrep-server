const downloadExercises = require('../models/downloadModel');

// download exercise controller
exports.addToDownloadExerciseController = async (req, res) => {
    console.log('inside addToDownloadExerciseController');

    const { id } = req.params;
    const userId = req.userId;
    const { name, images, level, primaryMuscles } = req.body;
    console.log(name, images, level, primaryMuscles);
    try {
        // Check if the exercise already exists for the user
        const existingExercise = await downloadExercises.findOne({ exerciseId: id })
        // If exercise does not exist, create a new entry
        if (existingExercise) {
            existingExercise.count += 1;
            await existingExercise.save()
            res.status(200).json(existingExercise)
        } else {
            // add new exercise to downloadExercises
            const newExercise = new downloadExercises({
                exerciseId: id,
                exerciseName: name,
                exerciseImage: images,
                level: level,
                primaryMuscles: primaryMuscles,
                count: 1,
                userId: userId
            })
            await newExercise.save()
            res.status(200).json(newExercise)

        }
    } catch (err) {
        res.status(401).json(err)
    }


}

// get user downloaded exercises controller
exports.getUserDownloadListController = async (req, res) => {
    console.log('inside getUserDownloadListController');
    const userId = req.userId;
    try{
        const allUserDownloads = await downloadExercises.find({userId});
        res.status(200).json(allUserDownloads);
    }catch(err){
        res.status(401).json(err);
    }
}


// get all download exercises list
    exports.getAllDownloadListController = async (req, res) => {
    console.log('inside getAllDownloadListController');
    try{
        const allDownloads = await downloadExercises.find();
        res.status(200).json(allDownloads);
    }catch(err){
        res.status(401).json(err.message);
    }
}
