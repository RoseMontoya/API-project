const express = require('express');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models')

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Validate Signup Middleware
const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true})
        .withMessage('First Name is required'),
    check('lastName')
        .exists({ checkFalsy: true})
        .withMessage('Last Name is required'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Invalid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Username is required'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password is required'),
    handleValidationErrors
];

// Sign up
router.post('/', validateSignup, async (req, res, next) => {
    const { email, password, username, firstName, lastName} = req.body;

    // Check if User exist
    const existingUser = await User.findOne({
        where: {
            [Op.or]: {
                username: username,
                email: email
            }
        }
    });
    console.log(existingUser)
    if (existingUser) {
        const err = new Error('User already exists');
        err.title = 'User already exists'
        err.status = 500;
        if (existingUser.username === username) {
            err.errors = { username: 'User with that username already exists'};
        } else {
            err.errors = { email: 'User with that email already exists'};
        }
        return next(err);
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, firstName, lastName, username, hashedPassword });

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
    };

    setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
})

module.exports = router;
