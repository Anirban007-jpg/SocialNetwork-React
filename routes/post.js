const {getPosts, createPost} = require('../controllers/post');
const express  = require('express');
const {createPostValidator} = require('../helpers/index');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/', requireSignin, getPosts)
router.post('/post',  createPostValidator, createPost)

module.exports = router;
// exports.getPosts = (req, res) => {
// };


