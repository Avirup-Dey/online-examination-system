const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {

    getSubjects,

    getQuizQuestions,

    submitQuiz,

    getHistory

} = require('../controllers/studentController');

router.get(

    '/subjects',

    authMiddleware,

    getSubjects

);

router.get(

    '/quiz/:id',

    authMiddleware,

    getQuizQuestions

);

router.post(

    '/submit',

    authMiddleware,

    submitQuiz

);

router.get(

    '/history',

    authMiddleware,

    getHistory

);

module.exports = router;