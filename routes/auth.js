const {signup, signin, signout,resetPassword,forgotPassword} = require('../controllers/auth');
const express  = require('express');
const {userSignupValidator, passwordResetValidator} = require('../helpers/index');


const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get("/signout", signout);

// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);





module.exports = router;