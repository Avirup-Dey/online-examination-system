const express = require('express');

const router = express.Router();

const adminMiddleware =
    require('../middleware/adminMiddleware');

const {

    getDashboard,

    getSubjects,

    createSubject,

    getQuestions,

    createQuestion,

    deleteQuestion,

    getUsers,

    getResults

} = require('../controllers/adminController');

router.get(

    '/dashboard',

    adminMiddleware,

    getDashboard

);

router.get(

    '/subjects',

    adminMiddleware,

    getSubjects

);

router.post(

    '/subjects',

    adminMiddleware,

    createSubject

);

router.get(

    '/questions',

    adminMiddleware,

    getQuestions

);

router.post(

    '/questions',

    adminMiddleware,

    createQuestion

);

router.delete(

    '/questions/:id',

    adminMiddleware,

    deleteQuestion

);

router.get(

    '/users',

    adminMiddleware,

    getUsers

);

router.get(

    '/results',

    adminMiddleware,

    getResults

);

module.exports = router;