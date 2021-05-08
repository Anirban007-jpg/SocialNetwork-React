exports.createPostValidator = (req, res, next) => {
    
    // title
    req.check('title', 'Write a title').notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    })

    // body
    req.check('body', 'Write a body').notEmpty();
    req.check('body', 'Body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000 
    })

    // check for errors
    const errors = req.validationErrors();

    // if error show the first one as they happen 
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    // mandatory
    next();
}

exports.userSignupValidator = (req, res, next) => {
    // name is not null and between 4 to 10
    req.check('name', 'Name is mandatory').notEmpty();
    req.check('name', 'Name must be between 6 to 40 characters').isLength({
        min: 6,
        max: 40
    })

    // email is not null, valid and normalised
    req.check('email', 'Email is mandatory').notEmpty();
    req.check('email', 'Email must be between 3 to 32 characters').matches(/.+\@.+\..+/).withMessage("Email must contain @").isLength({
        min: 3,
        max: 32
    })

    // check for password
    req.check("password", "password is required").notEmpty();
    req.check('password').isLength({min:6}).withMessage("Password must contain at least 6 charecters").matches(/\d/).withMessage("Password must contain a number");

    
    // check for errors
    const errors = req.validationErrors();
    
    // if error show the first one as they happen 
    if (errors) {
        const firstError = errors.map((error) => error.msg)[0];
        return res.status(400).json({error: firstError});
    }

    // mandatory
    next();
}

const nodeMailer = require("nodemailer");
 
const defaultEmailData = { from: "noreply@node-react.com" };

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");
 
    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};


 
exports.sendEmail = emailData => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "abanerjee763@gmail.com",
            pass: "fpovyuomziemmigh"
        }
    });
    return (
        transporter
            .sendMail(emailData)
            .then(info => console.log(`Message sent: ${info.response}`))
            .catch(err => console.log(`Problem sending email: ${err}`))
    );
};
