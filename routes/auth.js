const {signup} = require('../controllers/auth');
const express  = require('express');
//const {createPostValidator} = require('../helpers/index');

const router = express.Router();

router.post('/signup', signup);

module.exports = router;