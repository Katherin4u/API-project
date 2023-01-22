// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Sign up
// router.post(
//     '/',
//     async (req, res) => {
//         const { firstName, lastName, email, password, username } = req.body;
//         const user = await User.signup({ firstName, lastName, email, username, password });

//         await setTokenCookie(res, user);

//         return res.json({
//             user: user
//         });
//     }
// );

const validateSignup = [
    check('email')
        .isEmail()
        .withMessage("Invalid email"),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage("First Name is required"),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage("Last Name is required"),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({min: 4})
        .withMessage("Username is required"),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName } = req.body;
    let errors = {};
    const userEmail = await User.findOne({ where: { email } });
    if (userEmail) {
        errors.email = "User with that email already exists";
    }

    const userName = await User.findOne({ where: { username } });
    if (userName) {
        errors.username = "User with that username already exists";
    }



    let user = await User.signup({
        email,
        username,
        password,
        firstName,
        lastName,
    });
    let token = await setTokenCookie(res, user);

    user = user.toJSON();
    delete user.createdAt;
    delete user.updatedAt;
    user.token = token;


    return res.json({user: user});
});

module.exports = router;