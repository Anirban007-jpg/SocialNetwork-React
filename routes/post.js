const postController = require('../controllers/post');
const express  = require('express');
const validator = require('../helpers/index')

const router = express.Router();

router.get('/', postController.getPosts)
router.post('/post',  validator.createPostValidator, postController.createPost)

module.exports = router;
// exports.getPosts = (req, res) => {
// };


