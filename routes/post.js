const {getPosts, createPost, postsbyuser, postById, isPoster, deletePost, updatePost,postPhoto} = require('../controllers/post');
const express  = require('express');
const {createPostValidator} = require('../helpers/index');
const {userById} = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/posts',getPosts);

router.post('/post/new/:userId', requireSignin, createPost, createPostValidator);
router.get("/post/by/:userId", requireSignin, postsbyuser);
router.delete('/post/:postId', requireSignin, isPoster, deletePost)
router.put("/post/:postId", requireSignin, updatePost);


router.get("/post/photo/:postId", postPhoto);

// any route containing :userId, our app will first execute userbyId
router.param("userId", userById);
// any route containing :postId, our app will first execute postbyId
router.param("postId", postById);


module.exports = router;
// exports.getPosts = (req, res) => {
// };


