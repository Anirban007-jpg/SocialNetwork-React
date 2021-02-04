const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.signup = async (req, res) => {
    const userExsists = await User.findOne({email: req.body.email});
    if (userExsists) return res.status(403).json({
        error: "Email is taken!"
    });
    
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ user });
}

exports.signin = async (req, res) => {
    // find the user based on email
    const {email, password} = req.body;
    //const userExists = await User.findOne({email:req.body.email});
    // if error or no user
    // if User , authenticate
    // generate token with user id and secret
    // persist the token as 't' in cookie with expiry date
    // return response with user and token to frontend client

}