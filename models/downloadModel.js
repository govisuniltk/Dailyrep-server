const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
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
    count: {
        type: Number,
        default: 1
    },
    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'expert'],
        default: 'beginner',
    },
    primaryMuscles: {
        type: [String],
        required: true,
    },
    userId: {
        type: String,
        required: true
    }
    
})

const downloadExercises = mongoose.model('downloadExercises', downloadSchema);
module.exports = downloadExercises;