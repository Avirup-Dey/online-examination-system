const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    getQuizQuestions,
    submitQuiz
} = require('../controllers/quizController');

router.get('/:id', authMiddleware, getQuizQuestions);

router.post('/submit', authMiddleware, submitQuiz);

module.exports = router;