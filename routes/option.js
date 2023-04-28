const express = require('express');
const router = express.Router();
const optionController = require('../controllers/optionsController');

//route handler for deleting an option
router.delete('/:id/delete',optionController.delete);

//route handler for adding vote to option
router.patch('/:id/add_vote',optionController.addVote);

module.exports = router;