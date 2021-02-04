const User = require('../models/user');


exports.signup = async (req, res) => {
    const userExsists = await User.findOne({email: req.body.email});
    if (userExsists) return res.status(403).json({
        error: "Email is taken!"
    });
    
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ user });
}