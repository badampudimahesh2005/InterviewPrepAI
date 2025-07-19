const express = require('express');


const  {createSession,getSessionById,getMySessions,deleteSession} = require('../controllers/sessionController');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createSession);
router.get('/:id', protect, getSessionById);
router.get('/my-sessions', protect, getMySessions);
router.delete('/:id', protect, deleteSession);

module.exports = router;