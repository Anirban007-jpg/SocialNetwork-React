const {getPosts, createPost, postsbyuser, postById, isPoster, deletePost, updatePost,postPhoto,singlePost,like,unlike,comment,uncomment} = require('../controllers/post');
const express  = require('express');
const {createPostValidator} = require('../helpers/index');
const {userById} = require('../controllers/user');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/posts',getPosts);

// like unlike
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

// comment uncomment
router.put('/post/comment', requireSignin, comment);
router.put('/post/uncomment', requireSignin, uncomment);

// crud posts operations
router.post('/post/new/:userId', requireSignin, createPost);
router.get("/post/by/:userId", requireSignin, postsbyuser);
router.get("/post/:postId", singlePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost)
router.put("/post/:postId", requireSignin, updatePost);


// get post photo
router.get("/post/photo/:postId", postPhoto);

// any route containing :userId, our app will first execute userbyId
router.param("userId", userById);
// any route containing :postId, our app will first execute postbyId
router.param("postId", postById);


module.exports = router;
// exports.getPosts = (req, res) => {
// };


