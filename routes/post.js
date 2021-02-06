const {getPosts, createPost} = require('../controllers/post');
const express  = require('express');
const {createPostValidator} = require('../helpers/index');
const {userById} = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/', requireSignin, getPosts)
router.post('/post', requireSignin, createPostValidator, createPost)

// any route containing :userId, our app will first execute userbyId
router.param("userId", userById);

module.exports = router;
// exports.getPosts = (req, res) => {
// };


