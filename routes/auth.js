const {signup} = require('../controllers/auth');
const express  = require('express');
const {userSignupValidator} = require('../helpers/index');

const router = express.Router();

router.post('/signup', userSignupValidator, signup);

module.exports = router;