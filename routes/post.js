const {getPosts, createPost, postsbyuser} = require('../controllers/post');
const express  = require('express');
const {createPostValidator} = require('../helpers/index');
const {userById} = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/',getPosts);

router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get("/post/by/:userId", requireSignin, postsbyuser);

// any route containing :userId, our app will first execute userbyId
router.param("userId", userById);

module.exports = router;
// exports.getPosts = (req, res) => {
// };


