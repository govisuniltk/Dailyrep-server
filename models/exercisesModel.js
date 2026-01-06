
const mongoose = require('mongoose');

const exercisesSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    force: {
        type: String,
        enum: ['push', 'pull', 'static', 'other', 'isometric'],
        default: 'other'
    },

    level: {
        type: String,
        enum: ['beginner', 'intermediate', 'expert'],
        default: 'beginner',
    },

    mechanic: {
        type: String,
    },

    equipment: {
        type: String,
        default: 'body only',
    },

    primaryMuscles: {
        type: [String],
        required: true,
    },

    secondaryMuscles: {
        type: [String],
        default: [],
    },

    instructions: {
        type: [String],
        required: true,
    },

    category: {
        type: String,
        default: 'strength',
    },

    images: {
        type: [String],
        default: [],
    },

    id: {
        type: String,
        unique: true,
    },

},

    {
        timestamps: true // adds createdAt and updatedAt automatically
    });


const exercises = mongoose.model('exercises', exercisesSchema);
module.exports = exercises; 
