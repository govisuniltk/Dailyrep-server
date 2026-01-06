const mongoose = require('mongoose')

const saveExerciseSchema = new mongoose.Schema({
    exerciseId: {
        type: String,
        required: true
    },
    exerciseName: {
        type: String,
        required: true
    },
    exerciseImage: {
        type: [String],
        required: true
    },
    userId: {
        type: String,
        required: true
    },
})

const saveExercises = mongoose.model('saveExercises', saveExerciseSchema)
module.exports = saveExercises;