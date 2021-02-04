const postController = require('../controllers/post');
const express  = require('express');

const router = express.Router();

router.get('/', postController.getPosts)

module.exports = router;
// exports.getPosts = (req, res) => {
// };


