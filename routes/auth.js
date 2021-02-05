const {signup, signin, signout} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const express  = require('express');
const {userSignupValidator} = require('../helpers/index');


const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get("/signout", signout);


// any route containing :userId, our app will first execute userbyId
router.param("userId", userById);

module.exports = router;