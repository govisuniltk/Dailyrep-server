const express = require('express')
const exercisesController = require('../controllers/exercisesController')
const reviewController = require('../controllers/reviewController')
const userController = require('../controllers/userController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const downloadExercisesController = require('../controllers/downloadExercisesController')
const saveExerciseController = require('../controllers/saveExerciseController')
const testimonyController = require('../controllers/testimonyController')

const router = express.Router()

// All - exercises routes
router.get('/allExercises', exercisesController.getAllExercisesController)

// Review routes
router.post('/reviews/:id', reviewController.addReviewController)

// add-user route
router.post('/register', userController.addUserController)

// login route
router.post('/login', userController.loginController)

// view single exercise route
router.get('/exercise/:id/view', jwtMiddleware, exercisesController.getAExerciseController)

// download exercise route
router.post('/exercise/:id/download', jwtMiddleware, downloadExercisesController.addToDownloadExerciseController)

// save exercise route
router.post('/exercise/:id/save', jwtMiddleware, saveExerciseController.addToSaveExerciseController)

// add testimony route
router.post('/add-testimony', testimonyController.addTestimonyController)

// get user saved exercises route
router.get('/get-save-exercises', jwtMiddleware, saveExerciseController.getUserSavedExercisesController)

// remove saved exercise route
router.delete('/save-exercises/:id/remove', jwtMiddleware, saveExerciseController.removeSaveExerciseController)

// get user downloaded exercises route
router.get('/user/downloads', jwtMiddleware, downloadExercisesController.getUserDownloadListController)

// edit user profile route
router.post('/user/edit-profile', jwtMiddleware, userController.editUserController)

// get all-users route (admin)
router.get('/all-users',jwtMiddleware, userController.getAllUserController)

// get all download exercises route (admin)
router.get('/download-list',jwtMiddleware, downloadExercisesController.getAllDownloadListController)

// add exercise route (admin)
router.post('/add-exercise',jwtMiddleware, exercisesController.addExerciseController)

// edit exercise route (admin)
router.put('/exercise/:id/edit', jwtMiddleware, exercisesController.editExerciseController);

// delete exercise route (admin)
router.delete('/exercise/:id/delete', jwtMiddleware, exercisesController.deleteExerciseController);

// get all testimonies route
router.get('/all-testimonies', testimonyController.getAllTestimoniesController)

// update testimony route
router.put('/testimony/:id/update-status', jwtMiddleware, testimonyController.updateTestimonyController);

module.exports = router

