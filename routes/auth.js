const {signup, signin} = require('../controllers/auth');
const express  = require('express');
const {userSignupValidator} = require('../helpers/index');

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);

module.exports = router;