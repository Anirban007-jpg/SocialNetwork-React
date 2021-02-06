const Post = require('../models/post');
const fro = require('formidable');
const fs = require('fs');

exports.getPosts = (req, res) => {
    const post = Post.find().select("_id title body")
    .then((posts) => {
        res.status(200).json({ posts: posts})
    })
    .catch(err => console.log(err));
};

exports.createPost = (req, res) => {
    let form = new fro.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Your image could not be uploaded"
            })
        }
        let post = new post(fields);
        post.postedBy = req.profile;
        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type
        }

        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            res.json(result);
        })
    })
      
}