const {signup, signin, signout} = require('../controllers/auth');
const express  = require('express');
const {userSignupValidator} = require('../helpers/index');


const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get("/signout", signout)

module.exports = router;