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
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Invalid email"),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage("First Name is required"),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage("Last Name is required"),
    check('username')
        .not()
        .isEmail()
        .withMessage("Username is required"),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { firstName, lastName, email, password, username } = req.body;
        const userEmail = await User.findOne({
            where: { email },
        });
        const userUsername = await User.findOne({
            where: { username },
        });

        if (userEmail) {
            res.status(403);
            return res.json({
                message: "User already exists",
                statusCode: 403,
                errors: {
                    email: "User with that email already exists",
                },
            });
        }

        if (userUsername) {
            res.status(403);
            return res.json({
                message: "User already exists",
                statusCode: 403,
                errors: {
                    email: "User with that username already exists",
                },
            });
        }
        const user = await User.signup({ firstName, lastName, email, username, password });
        await setTokenCookie(res, user);
        user = user.toJSON();
        user.token = token;
        return res.json({user: user});
    }
);

module.exports = router;