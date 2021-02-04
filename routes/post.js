const postController = require('../controllers/post');
const express  = require('express');

const router = express.Router();

router.get('/', postController.getPosts)
router.post('/post', postController.createPost)

module.exports = router;
// exports.getPosts = (req, res) => {
// };


