const express = require('express');
const {togglePinQuestion, updateQuestionNote, addQuestionToSession} = require('../controllers/questionController');

const router = express.Router();

// Add a question to the session
router.post('/add', addQuestionToSession);

// Toggle pin status of a question
router.post('/:id/pin', togglePinQuestion);

// Update note for a question
router.post('/:id/note', updateQuestionNote);

module.exports = router;
