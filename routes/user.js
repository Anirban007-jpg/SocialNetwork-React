const {userById, allUsers, getUser} = require('../controllers/user');
const express  = require('express');
const { requireSignin } = require('../controllers/auth');


const router = express.Router();

router.get('/users', allUsers);
router.get('/users/:userId', requireSignin ,getUser);

// any route containing :userId, our app will first execute userbyId
router.param("userId", userById);

module.exports = router;