const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const questionsController = require('../controllers/questionsController');

//get all details
router.get('/',questionsController.home);

//search a question
router.get('/:id', questionsController.view);

//create a question
router.post('/create',questionsController.createQuestion);

//create an option
router.post('/:id/options/create',questionsController.createOption);

//delete a question
router.delete('/:id/delete',questionsController.delete);

module.exports = router;