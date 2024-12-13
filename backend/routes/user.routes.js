const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');

router.post('/register',[
    body('fullname.firstname').notEmpty().withMessage('firstnamename is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], userController.registerUser);

router.post('/login',
    [
body('email').isEmail().withMessage('Invalid email'),
body('password').notEmpty().withMessage('Password is required')
    ],
     userController.loginUser);











module.exports = router;
