const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
} = require('../controllers/authController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/logout', logoutUser);

router.get('/user', getCurrentUser);

module.exports = router;